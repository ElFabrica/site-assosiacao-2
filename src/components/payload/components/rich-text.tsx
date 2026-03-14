import { RichText as RichTextConverter } from "@payloadcms/richtext-lexical/react";
import { cn } from "@/lib/utils";

import {
  JSXConvertersFunction,
  LinkJSXConverter,
} from "@payloadcms/richtext-lexical/react";
import type {
  DefaultNodeTypes,
  SerializedLinkNode,
} from "@payloadcms/richtext-lexical";

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { relationTo, value } = linkNode.fields.doc!;
  if (typeof value !== "object") {
    throw new TypeError("Expected value to be an object");
  }
  const slug = value.slug;

  switch (relationTo) {
    case "news":
      return `/news/${slug}`;
    default:
      return `/${relationTo}/${slug}`;
  }
};

const jsxConverter: JSXConvertersFunction<DefaultNodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
});

type Props = {
  data: any;
} & React.ComponentProps<"div">;

export function RichText({ data, className, ...props }: Props) {
  if (!data) return null;
  return (
    <RichTextConverter
      {...props}
      className={cn(
        "prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-emerald-600 prose-img:rounded-xl",
        className,
      )}
      data={data}
      converters={jsxConverter}
    />
  );
}
