'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

const faqKeys = [
  { questionKey: 'question1', answerKey: 'answer1' },
  { questionKey: 'question2', answerKey: 'answer2' },
  { questionKey: 'question3', answerKey: 'answer3' },
  { questionKey: 'question4', answerKey: 'answer4' },
  { questionKey: 'question5', answerKey: 'answer5' },
  { questionKey: 'question6', answerKey: 'answer6' },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = useTranslations('faq');

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-warm">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl text-charcoal mb-4">
            {t('title')}
          </h2>
          <p className="text-muted max-w-lg mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqKeys.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-white rounded-xl border border-black/5 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-sand/50 transition-colors"
                >
                  <span className="font-medium text-charcoal text-sm sm:text-base">
                    {t(faq.questionKey)}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5">
                    <p className="text-muted text-sm leading-relaxed">
                      {t(faq.answerKey)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
