import { Product } from "@/types/product";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import Image from "next/image";
import { Chat, Configure, InstantSearch } from "react-instantsearch";
import ShinyText from "../animation/shiny-text";
import { ProductCard } from "../common/product-card";
import "../instantsearch.css/components/chat.scss";

const agentAppId = process.env.NEXT_PUBLIC_ALGOLIA_AGENT_APP_ID!;
const agentApiKey = process.env.NEXT_PUBLIC_ALGOLIA_AGENT_API_KEY!;
const agentId = process.env.NEXT_PUBLIC_ALGOLIA_AGENT_ID!;
const agentIndexName = process.env.NEXT_PUBLIC_ALGOLIA_AGENT_INDEX_NAME!;

const searchClient = algoliasearch(agentAppId, agentApiKey);

export default function AlgoliaChat() {
  return (
    /* We are using the [&_*] selector which targets EVERY child element 
       inside this div to reset any restrictive Algolia defaults.
    */
    <div
      className="relative h-full w-full
        **:transform-none! 
        **:transition-none! 
        **:opacity-100! 
        **:pointer-events-auto!
        
        [&_.ais-Chat]:static! 
        [&_.ais-Chat]:h-full! 
        [&_.ais-Chat]:w-full!
        [&_.ais-Chat]:max-h-full!
        [&_.ais-Chat]:max-w-full!
        [&_.ais-Chat]:flex 
        [&_.ais-Chat]:flex-col
        
        [&_.ais-Chat-window]:h-full! 
        [&_.ais-Chat-window]:shadow-none! 
        [&_.ais-Chat-window]:static!
        
        [&_.ais-ChatHeader]:border-b!
        [&_.ais-ChatHeader]:border-white/20!

        [&_.ais-Chat-container]:static!
        [&_.ais-Chat-container]:h-full!

        [&_.ais-Chat-container]:bg-transparent!
        
        [&_.ais-Chat-toggleButtonWrapper]:hidden!
        
        [&_.ais-ChatPrompt]:before:content-none! 
        [&_.ais-ChatHeader]:after:content-none!

        [&_.ais-ChatMessage-message_.ais-Carousel]:before:content-none! 
        [&_.ais-ChatMessage-message_.ais-Carousel]:after:content-none!
        "
    >
      <InstantSearch searchClient={searchClient} indexName={agentIndexName}>
        {/* Adding 'isolate' helps create a clean stacking context 
            where children are preferred for clicks. 
        */}
        <div className="h-full w-full flex flex-col isolate">
          <Configure
            hitsPerPage={10}
            attributesToRetrieve={[
              "name",
              "description",
              "brand",
              "category",
              "size",
              "material",
              "price",
              "occasion",
              "style",
              "color",
              "objectID",
              "image_url",
            ]}
            attributesToSnippet={["name", "description"]}
            snippetEllipsisText="…"
          />

          <Chat
            agentId={agentId}
            title="Maya • Assistant Mode"
            translations={{
              header: {
                title: "Maya • Assistant Mode",
                closeLabel: "Close chat",
              },
              messages: {
                loaderText: "Maya is thinking...", // Fallback text
              },
            }}
            itemComponent={({ item }) => (
              <ProductCard
                product={item as unknown as Product}
                index={Number()}
              />
            )}
            classNames={{
              header: {
                clear: "hidden!",
                close: "hidden!",
                maximize: "hidden!",
              },
            }}
            headerMinimizeIconComponent={() => <div />}
            headerTitleIconComponent={() => (
              <Image
                src="/images/assistant_avatar.jpg"
                alt="Assistant Avatar"
                className=" rounded-4xl"
                width={35}
                height={35}
              />
            )}
            messagesLoaderComponent={() => (
              <ShinyText text="Curating some picks you'll love..." />
            )}
          />
        </div>
      </InstantSearch>
    </div>
  );
}
