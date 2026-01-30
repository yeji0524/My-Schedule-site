"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCalendarDropdownOpen, setIsCalendarDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#musicals", label: "Musicals" },
    { href: "#moments", label: "Moments" },
  ];

  const calendarLinks = [
    { href: "#goeunseong", label: "고은성" },
    { href: "#kimseongcheol", label: "김성철" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* 로고/이름 */}
          <a
            href="#"
            className={`text-xl font-semibold transition-colors ${
              isScrolled ? "text-neutral-800" : "text-white"
            }`}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            김예지
          </a>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-amber-500 ${
                  isScrolled ? "text-neutral-600" : "text-white/90"
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* 캘린더 드롭다운 */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsCalendarDropdownOpen(true)}
                className={`text-sm font-medium transition-colors hover:text-amber-500 flex items-center gap-1 ${
                  isScrolled ? "text-neutral-600" : "text-white/90"
                }`}
              >
                캘린더
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isCalendarDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* 드롭다운 메뉴 */}
              {isCalendarDropdownOpen && (
                <div
                  onMouseEnter={() => setIsCalendarDropdownOpen(true)}
                  onMouseLeave={() => setIsCalendarDropdownOpen(false)}
                  className="absolute left-1/2 -translate-x-1/2 z-50"
                  style={{ top: "calc(100% + 8px)" }}
                >
                  <div className="w-48 bg-white rounded-lg shadow-xl border border-neutral-200 overflow-hidden">
                    {calendarLinks.map((link, index) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsCalendarDropdownOpen(false)}
                        className={`block px-5 py-3 text-base font-medium text-neutral-700 hover:bg-amber-500 hover:text-white transition-colors ${
                          index !== calendarLinks.length - 1 ? "border-b border-neutral-100" : ""
                        }`}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 모바일 햄버거 버튼 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 transition-colors ${
              isScrolled ? "text-neutral-800" : "text-white"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-neutral-200">
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-neutral-600 hover:text-amber-500 transition-colors"
                >
                  {link.label}
                </a>
              ))}

              {/* 모바일 캘린더 메뉴 */}
              <div>
                <button
                  onClick={() => setIsCalendarDropdownOpen(!isCalendarDropdownOpen)}
                  className="text-neutral-600 hover:text-amber-500 transition-colors flex items-center gap-2"
                >
                  캘린더
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isCalendarDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isCalendarDropdownOpen && (
                  <div className="ml-4 mt-2 flex flex-col gap-2">
                    {calendarLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsCalendarDropdownOpen(false);
                        }}
                        className="text-neutral-500 hover:text-amber-500 transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
