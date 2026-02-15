'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Upload, ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';
import Select from '@/components/ui/select';
import Card from '@/components/ui/card';

export default function SellPage() {
  const t = useTranslations();
  const [step, setStep] = useState(1);

  const categories = [
    { value: '', label: t('sell.formCategory') },
    { value: 'bags', label: t('categories.bags') },
    { value: 'shoes', label: t('categories.shoes') },
    { value: 'clothing', label: t('categories.clothing') },
    { value: 'accessories', label: t('categories.accessories') },
    { value: 'jewelry', label: t('categories.jewelry') },
    { value: 'watches', label: t('categories.watches') },
  ];

  const conditions = [
    { value: '', label: t('sell.formCondition') },
    { value: 'new', label: t('conditions.new') },
    { value: 'excellent', label: t('conditions.excellent') },
    { value: 'good', label: t('conditions.good') },
    { value: 'fair', label: t('conditions.fair') },
  ];

  const steps = [
    t('sell.step1'),
    t('sell.step2'),
    t('sell.step3'),
    t('sell.step4'),
    t('sell.step5'),
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-serif mb-4">{t('sell.title')}</h1>
        <p className="text-gray-600">{t('sell.subtitle')}</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          {steps.map((stepLabel, index) => (
            <div
              key={index}
              className="flex items-center flex-1 last:flex-initial"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    index + 1 <= step
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index + 1}
                </div>
                <p className="text-xs mt-2 text-center hidden md:block">
                  {stepLabel}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-2 ${
                    index + 1 < step ? 'bg-black' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <Card>
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">{t('sell.step1')}</h2>
            <Input
              label={t('sell.formTitle')}
              placeholder={t('sell.formTitlePlaceholder')}
              fullWidth
            />
            <Textarea
              label={t('sell.formDescription')}
              placeholder={t('sell.formDescriptionPlaceholder')}
              rows={6}
              fullWidth
            />
            <Input
              label={t('sell.formBrand')}
              placeholder={t('sell.formBrandPlaceholder')}
              fullWidth
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label={t('sell.formCategory')}
                options={categories}
                fullWidth
              />
              <Select
                label={t('sell.formCondition')}
                options={conditions}
                fullWidth
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">{t('sell.step2')}</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-black transition-colors cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 mb-2">{t('sell.dragDrop')}</p>
              <p className="text-sm text-gray-400">{t('sell.uploadPhotosDesc')}</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">{t('sell.step3')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label={t('sell.formSize')} fullWidth />
              <Input label={t('sell.formColor')} fullWidth />
              <Input label={t('sell.formMaterial')} fullWidth />
              <Input label={t('sell.formYear')} type="number" fullWidth />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">{t('sell.step4')}</h2>
            <Input
              label={t('sell.formPrice')}
              type="number"
              placeholder={t('sell.formPricePlaceholder')}
              fullWidth
            />
            <Input
              label={t('sell.formOriginalPrice')}
              type="number"
              placeholder={t('sell.formPricePlaceholder')}
              fullWidth
            />
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">{t('sell.step5')}</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-center text-gray-600">
                Review your listing details here...
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4 mt-8 pt-8 border-t-2">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('sell.back')}
            </Button>
          )}
          {step < 5 ? (
            <Button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 ml-auto"
            >
              {t('sell.next')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button className="ml-auto">{t('sell.submit')}</Button>
          )}
        </div>
      </Card>
    </div>
  );
}
