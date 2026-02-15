'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Menu, X, Heart, User, ShoppingBag, Search } from 'lucide-react';
import Button from '@/components/ui/button';
import LocaleSwitcher from './locale-switcher';

export default function Navbar() {
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white border-b-2 border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-3xl font-bold font-serif">KLOSET</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/explore"
              className="text-gray-900 hover:text-gray-600 font-medium transition-colors"
            >
              {t('explore')}
            </Link>
            <Link
              href="/sell"
              className="text-gray-900 hover:text-gray-600 font-medium transition-colors"
            >
              {t('sell')}
            </Link>
            <Link
              href="/how-it-works"
              className="text-gray-900 hover:text-gray-600 font-medium transition-colors"
            >
              {t('howItWorks')}
            </Link>
            <Link
              href="/about"
              className="text-gray-900 hover:text-gray-600 font-medium transition-colors"
            >
              {t('about')}
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/favorites"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart className="w-5 h-5" />
            </Link>
            <Link
              href="/dashboard"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
            </Link>
            <Link
              href="/profile"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>
            <LocaleSwitcher />
            <Link href="/auth/signin">
              <Button variant="outline" size="sm">
                {t('signIn')}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t-2 border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link href="/explore" className="text-gray-900 font-medium">
                {t('explore')}
              </Link>
              <Link href="/sell" className="text-gray-900 font-medium">
                {t('sell')}
              </Link>
              <Link href="/how-it-works" className="text-gray-900 font-medium">
                {t('howItWorks')}
              </Link>
              <Link href="/about" className="text-gray-900 font-medium">
                {t('about')}
              </Link>
              <div className="flex items-center space-x-4 pt-4 border-t-2 border-gray-100">
                <Link href="/favorites">
                  <Heart className="w-5 h-5" />
                </Link>
                <Link href="/dashboard">
                  <ShoppingBag className="w-5 h-5" />
                </Link>
                <Link href="/profile">
                  <User className="w-5 h-5" />
                </Link>
                <LocaleSwitcher />
              </div>
              <Link href="/auth/signin">
                <Button fullWidth>{t('signIn')}</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
