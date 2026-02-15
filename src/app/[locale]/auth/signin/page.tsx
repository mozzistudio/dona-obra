'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Card from '@/components/ui/card';

export default function SignInPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="text-4xl font-bold font-serif mb-2">KLOSET</h1>
          </Link>
          <p className="text-gray-600">{t('auth.signInTitle')}</p>
        </div>

        <Card>
          <form className="space-y-6">
            <Input
              label={t('auth.email')}
              type="email"
              placeholder="email@example.com"
              fullWidth
            />
            <Input
              label={t('auth.password')}
              type="password"
              fullWidth
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-gray-600 hover:text-black"
              >
                {t('auth.forgotPassword')}
              </Link>
            </div>

            <Button type="submit" fullWidth size="lg">
              {t('auth.signIn')}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  {t('auth.orContinueWith')}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button variant="outline" fullWidth>
                {t('auth.google')}
              </Button>
              <Button variant="outline" fullWidth>
                {t('auth.facebook')}
              </Button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            {t('auth.noAccount')}{' '}
            <Link
              href="/auth/signup"
              className="font-semibold text-black hover:underline"
            >
              {t('auth.signUp')}
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
