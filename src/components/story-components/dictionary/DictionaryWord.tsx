"use client";

import {
  useContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import {
  deepCloneDict,
  DictionaryContext,
  type DictionaryDefinition,
  type Instances,
} from "./DictionaryContext";

interface Props {
  word: string;
}

interface EntryReference {
  index: number;
  entry: DictionaryDefinition | null;
}

function getText(node: ChildNode) {
  if (node.parentNode && node.parentNode.textContent) {
    return node.parentNode.textContent;
  } else if (node.textContent) {
    return node.textContent;
  } else {
    return;
  }
}

export default function DictionaryWord({
  word,
  children,
}: PropsWithChildren<Props>) {
  const dictionary = useContext(DictionaryContext);
  const [dictEntry, setDictEntry] = useState<null | EntryReference>(null);
  const scrollRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let dictRef: EntryReference = {
      index: -1,
      entry: null,
    };

    dictionary?.dictionary.dict.forEach((item, index) => {
      if (item.word == word) {
        dictRef = {
          index: index,
          entry: item,
        };
      }
    });

    setDictEntry(dictRef);
  }, [dictionary?.dictionary]);

  // useEffect(() => {
  //   if (dictionary && scrollRef.current) {
  //     const newDict = deepCloneDict(dictionary.dictionary.dict);

  //     const text = getText(scrollRef.current);

  //     let instances: Instances[] = [];

  //     let dictRef: EntryReference = {
  //       index: -1,
  //       entry: null,
  //     };

  //     newDict.forEach((item, index) => {
  //       if (item.word == word) {
  //         instances = item.instances;
  //         dictRef = {
  //           index: index,
  //           entry: item,
  //         };
  //       }
  //     });

  //     if (dictRef.entry) {
  //       let needToAdd = true;
  //       dictRef.entry?.instances.forEach((item) => {
  //         if (item.sentence == text) {
  //           needToAdd = false;
  //         }
  //       });

  //       if (needToAdd && dictRef.entry?.instances) {
  //         newDict[dictRef.index].instances.push({
  //           sentence: text ? text : "",
  //           elementRef: scrollRef.current,
  //         });
  //         dictionary.setDictionary({
  //           dict: newDict,
  //           sidebarRef: dictionary.dictionary.sidebarRef,
  //         });
  //       }
  //     }
  //   }
  // }, []);

  return (
    <button
      ref={scrollRef}
      onClick={() => {
        if (dictionary && dictEntry?.entry) {
          dictionary.setWord({
            ...dictEntry.entry,
          });
          dictionary.dictionary.lastClickedRef = scrollRef.current;
          dictionary.setOpen(true);
          dictionary.setPreviousWords([]);
        }
      }}
      type="button"
      className="fw-bold m-0 mx-1 rounded-lg border-2 border-sciquelTeal bg-white px-2 py-1 text-sciquelTeal"
    >
      {children ? children : word}
    </button>
  );
}
