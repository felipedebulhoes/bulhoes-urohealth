import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useState, useRef, useCallback } from "react";
import { Upload, Trash2, FileText, Image, Film, Music, File, Loader2, Copy, Check, ArrowLeft, FolderOpen } from "lucide-react";
import { Link } from "wouter";

const FILE_SIZE_LIMIT = 10 * 1024 * 1024; // 10MB

const CATEGORIES = [
  { value: "", label: "Todos" },
  { value: "documentos", label: "Documentos" },
  { value: "imagens", label: "Imagens" },
  { value: "videos", label: "Vídeos" },
  { value: "outros", label: "Outros" },
];

function getFileIcon(mimeType: string) {
  if (mimeType.startsWith("image/")) return <Image className="w-5 h-5 text-emerald-500" />;
  if (mimeType.startsWith("video/")) return <Film className="w-5 h-5 text-blue-500" />;
  if (mimeType.startsWith("audio/")) return <Music className="w-5 h-5 text-purple-500" />;
  if (mimeType.includes("pdf")) return <FileText className="w-5 h-5 text-red-500" />;
  return <File className="w-5 h-5 text-gray-500" />;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);
  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
      title="Copiar URL"
    >
      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
    </button>
  );
}

export default function AdminFiles() {
  const { user, loading: authLoading, isAuthenticated } = useAuth({ redirectOnUnauthenticated: true });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("documentos");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filesQuery = trpc.files.list.useQuery(
    selectedCategory ? { category: selectedCategory } : undefined
  );
  const uploadMutation = trpc.files.upload.useMutation({
    onSuccess: () => {
      filesQuery.refetch();
      setDescription("");
      setUploadError(null);
    },
    onError: (err) => {
      setUploadError(err.message);
    },
  });
  const deleteMutation = trpc.files.delete.useMutation({
    onSuccess: () => filesQuery.refetch(),
  });

  const handleFileUpload = useCallback(
    async (file: globalThis.File) => {
      if (file.size > FILE_SIZE_LIMIT) {
        setUploadError(`Arquivo muito grande (${formatFileSize(file.size)}). Limite: 10MB.`);
        return;
      }
      setUploading(true);
      setUploadError(null);
      try {
        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(",")[1]); // Remove data:...;base64, prefix
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        await uploadMutation.mutateAsync({
          filename: file.name,
          mimeType: file.type || "application/octet-stream",
          base64Data: base64,
          description: description || undefined,
          category: category || undefined,
        });
      } catch {
        // Error handled by mutation onError
      } finally {
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [description, category, uploadMutation]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileUpload(file);
    },
    [handleFileUpload]
  );

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-[#0D9488]" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Acesso Restrito</h1>
          <p className="text-gray-600 mb-4">Esta página é exclusiva para administradores.</p>
          <Link href="/" className="text-[#0D9488] hover:underline">Voltar ao site</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-[#0D9488]" />
                Gerenciador de Arquivos
              </h1>
              <p className="text-sm text-gray-500">Upload e gerenciamento de arquivos do site</p>
            </div>
          </div>
          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
            Admin
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Upload area */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5 text-[#0D9488]" />
            Upload de Arquivo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição (opcional)</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Certificado TCBC"
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#0D9488] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#0D9488] focus:border-transparent outline-none bg-white"
              >
                <option value="documentos">Documentos</option>
                <option value="imagens">Imagens</option>
                <option value="videos">Vídeos</option>
                <option value="outros">Outros</option>
              </select>
            </div>
          </div>

          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
              dragOver
                ? "border-[#0D9488] bg-emerald-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
            />
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 animate-spin text-[#0D9488]" />
                <p className="text-sm text-gray-600">Enviando arquivo...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-8 h-8 text-gray-400" />
                <p className="text-sm text-gray-600">
                  Arraste um arquivo aqui ou <span className="text-[#0D9488] font-medium">clique para selecionar</span>
                </p>
                <p className="text-xs text-gray-400">Máximo 10MB por arquivo</p>
              </div>
            )}
          </div>

          {uploadError && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {uploadError}
            </div>
          )}
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 mb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat.value
                  ? "bg-[#0D9488] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* File list */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {filesQuery.isLoading ? (
            <div className="p-8 text-center">
              <Loader2 className="w-6 h-6 animate-spin text-[#0D9488] mx-auto" />
            </div>
          ) : !filesQuery.data?.length ? (
            <div className="p-8 text-center text-gray-500">
              <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-sm">Nenhum arquivo encontrado.</p>
            </div>
          ) : (
            <div className="divide-y">
              {filesQuery.data.map((file) => (
                <div key={file.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  {/* Thumbnail or icon */}
                  <div className="flex-shrink-0">
                    {file.mimeType.startsWith("image/") ? (
                      <img
                        src={file.url}
                        alt={file.filename}
                        className="w-12 h-12 rounded-lg object-cover border"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                        {getFileIcon(file.mimeType)}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.filename}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                      <span>{formatFileSize(file.size)}</span>
                      <span>·</span>
                      <span>{file.category || "Sem categoria"}</span>
                      {file.description && (
                        <>
                          <span>·</span>
                          <span className="truncate">{file.description}</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">{file.url}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <CopyButton text={file.url} />
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                      title="Abrir arquivo"
                    >
                      <FileText className="w-4 h-4 text-gray-400" />
                    </a>
                    <button
                      onClick={() => {
                        if (confirm(`Excluir "${file.filename}"?`)) {
                          deleteMutation.mutate({ id: file.id });
                        }
                      }}
                      className="p-1.5 rounded-md hover:bg-red-50 transition-colors"
                      title="Excluir"
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
