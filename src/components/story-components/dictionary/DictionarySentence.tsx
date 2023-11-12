"use client";

import {
  useContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { deepCloneDict, DictionaryContext } from "./DictionaryContext";
import DictionaryWord from "./DictionaryWord";

export default function DictionarySentence({ children }: PropsWithChildren) {
  const fullDictionary = useContext(DictionaryContext);
  const sentenceRef = useRef<HTMLSpanElement>(null);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (
      fullDictionary?.selectedInstance &&
      sentenceRef.current &&
      sentenceRef.current.contains(fullDictionary.selectedInstance.instance)
    ) {
      setHighlight(true);
    }
  }, [fullDictionary?.selectedInstance]);

  useEffect(() => {
    if (highlight) {
      setTimeout(() => {
        setHighlight(false);
      }, 3000);
    }
  }, [highlight]);

  useEffect(() => {
    // see about adding sentence to instances?
    let indexList: number[] = [];
    console.log(sentenceRef.current?.textContent);
    if (
      sentenceRef.current &&
      sentenceRef.current.textContent &&
      fullDictionary?.dictionary.dict
    ) {
      // see what vocab word(s) we match in our sentence?

      let testSentence = sentenceRef.current.textContent;

      let wordAdded = false;

      fullDictionary.dictionary.dict.forEach((item, index) => {
        wordAdded = false;
        let testWord = new RegExp(item.word, "i");
        if (testWord.test(testSentence)) {
          // we need to add word to sentence
          indexList.push(index);
          wordAdded = true;
        } else if (item.altSpellings.length > 0) {
          //we should check we don't have an alt spelling of the word?
          let altSpellIndex = 0;
          while (altSpellIndex < item.altSpellings.length && !wordAdded) {
            testWord = new RegExp(item.altSpellings[altSpellIndex], "i");
            if (testWord.test(testSentence)) {
              wordAdded = true;
              indexList.push(index);
            } else {
              altSpellIndex++;
            }
          }
          // all alt spellings checked?
        }
        // final check if we add the word?
        if (wordAdded) {
          console.warn(item.word, " is in test sentence");
        }
      });

      let spanRef = sentenceRef.current;
      // should have all our instances added to our copyDict?
      fullDictionary.setDictionary((state) => {
        let copyState = deepCloneDict(state.dict);
        indexList.forEach((item) => {
          copyState[item].instances.push({
            sentence: testSentence,
            elementRef: spanRef,
          });
        });

        return { dict: copyState, lastClickedRef: state.lastClickedRef };
      });
    }
  }, []);

  return (
    <span
      ref={sentenceRef}
      className={`${
        highlight ? "rounded bg-sciquelGreen  " : ""
      } relative transition-all duration-500`}
    >
      {children}
    </span>
  );
}
