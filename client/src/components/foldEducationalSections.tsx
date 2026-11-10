/**
 * Organiza os guias educativos: a introdução e os avisos de segurança ficam
 * visíveis; as demais seções são recolhidas, com o texto mantido no HTML.
 */
import { Children, Fragment, type ReactElement, type ReactNode, cloneElement, isValidElement } from "react";
import SectionFold from "@/components/SectionFold";

const SAFETY_TITLE = /quando procurar|sinais? de alerta|emerg|urg[eê]ncia|riscos?\b|complica|contraindica/i;
const ALERT_CLASS = /(bg|border)-(red|amber|orange)-/;
const VISIBLE_INNER_BLOCKS = 2;
const MIN_INNER_BLOCKS = 4;

type WithProps = ReactElement<{ children?: ReactNode; className?: string }>;

function elementsOf(node: ReactNode): WithProps[] {
  return Children.toArray(node).filter(isValidElement) as WithProps[];
}

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  return Children.toArray(node)
    .map((child) => (isValidElement(child) ? textOf((child as WithProps).props.children) : typeof child === "string" ? child : ""))
    .join("");
}

function findHeading(node: ReactNode): string | null {
  for (const el of elementsOf(node)) {
    if (el.type === "h2") return textOf(el.props.children).trim();
    const found = findHeading(el.props.children);
    if (found) return found;
  }
  return null;
}

function hasAlert(node: ReactNode): boolean {
  return elementsOf(node).some(
    (el) => ALERT_CLASS.test(el.props.className ?? "") || hasAlert(el.props.children),
  );
}

function flatten(children: ReactNode): ReactNode[] {
  return Children.toArray(children).flatMap((child) =>
    isValidElement(child) && child.type === Fragment ? flatten((child as WithProps).props.children) : [child],
  );
}

function mustStayVisible(title: string | null, content: ReactNode) {
  return !title || SAFETY_TITLE.test(title) || hasAlert(content);
}

/** Guias com um único bloco e vários subtemas: recolhe a partir do terceiro subtema. */
function foldInnerBlocks(section: WithProps): WithProps | null {
  const sectionChildren = elementsOf(section.props.children);
  const wrapper = sectionChildren.find((el) => /\bcontainer\b/.test(el.props.className ?? ""));
  if (!wrapper) return null;
  const blocks = Children.toArray(wrapper.props.children);
  const withHeading = blocks.filter((block) => isValidElement(block) && findHeading((block as WithProps).props.children));
  if (withHeading.length < MIN_INNER_BLOCKS) return null;

  let seen = 0;
  const next = blocks.map((block, index) => {
    if (!isValidElement(block)) return block;
    const el = block as WithProps;
    const title = findHeading(el.props.children);
    if (!title) return block;
    seen += 1;
    if (seen <= VISIBLE_INNER_BLOCKS || mustStayVisible(title, el.props.children)) return block;
    return (
      <SectionFold key={el.key ?? index} title={title} inset>
        {block}
      </SectionFold>
    );
  });

  const newWrapper = cloneElement(wrapper, {}, next);
  return cloneElement(
    section,
    {},
    sectionChildren.map((el) => (el === wrapper ? newWrapper : el)),
  );
}

export function foldEducationalSections(children: ReactNode, afterFirst?: ReactNode): ReactNode {
  let seenFirst = false;
  const withInsert = (node: ReactNode, index: number) => {
    const isFirst = !seenFirst;
    seenFirst = true;
    if (!isFirst || !afterFirst) return node;
    return (
      <Fragment key={`first-${index}`}>
        {node}
        {afterFirst}
      </Fragment>
    );
  };
  return flatten(children).map((child, index) => {
    if (!isValidElement(child) || child.type !== "section") return child;
    const section = child as WithProps;
    const inner = foldInnerBlocks(section);
    if (inner) return withInsert(inner, index);
    if (!seenFirst) return withInsert(child, index);
    const title = findHeading(section.props.children);
    if (mustStayVisible(title, section.props.children)) return child;
    return (
      <SectionFold key={section.key ?? index} title={title as string}>
        {child}
      </SectionFold>
    );
  });
}
