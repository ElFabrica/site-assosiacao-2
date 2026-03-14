"use client";
import { Button } from "@/components/ui/button";
import { useShare } from "@/hooks/use-share";

type PostShareProps = {
  url: string;
  title: string;
  description: string;
};

export const PostShare = ({ url, title, description }: PostShareProps) => {
  const { shareButtons } = useShare({
    url,
    title,
    text: description,
  });

  return (
    <div className="flex flex-col">
      <h2 className="font-semibold text-lg text-gray-900">Compartilhar</h2>
      <div className="flex items-center gap-2 mt-2">
        {shareButtons.map((provider) => (
          <Button
            key={provider.provider}
            onClick={() => provider.action()}
            size="icon-sm"
            className="bg-gray-100 text-gray-900 hover:bg-gray-200"
          >
            {provider.icon}
          </Button>
        ))}
      </div>
    </div>
    // <aside className="space-y-6">
    //   <div className="rounded-lg bg-gray-700">
    //     <h2 className="hidden md:block mb-4 text-heading-xs text-gray-100">
    //       Compartilhar
    //     </h2>

    //     <div className="flex justify-between md:flex-col gap-2">
    //       {shareButtons.map((provider) => (
    //         <Button
    //           key={provider.provider}
    //           onClick={() => provider.action()}
    //           variant="outline"
    //           className="w-fit md:w-full justify-start gap-2"
    //         >
    //           {provider.icon}
    //           <span className="hidden md:block">{provider.name}</span>
    //         </Button>
    //       ))}
    //     </div>
    //   </div>
    // </aside>
  );
};
