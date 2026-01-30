"use client";

import { useState } from "react";

interface CastingDate {
  date: string; // "2026-02-15" 형식
  show: string; // 공연 제목
  time?: string; // 관람 시간
}

interface ActorCalendarProps {
  actorName: string;
  castingDates: CastingDate[];
}

export default function ActorCalendar({ actorName, castingDates: initialCastingDates }: ActorCalendarProps) {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(2); // 2월부터 시작
  const [castingDates, setCastingDates] = useState<CastingDate[]>(initialCastingDates);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ show: "", time: "" });

  // 해당 월의 첫날과 마지막날 구하기
  const getMonthData = (year: number, month: number) => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay(); // 0(일) ~ 6(토)

    return { daysInMonth, startDayOfWeek };
  };

  const { daysInMonth, startDayOfWeek } = getMonthData(currentYear, currentMonth);

  // 이전 달로 이동
  const goToPrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // 다음 달로 이동
  const goToNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // 특정 날짜에 캐스팅이 있는지 확인
  const getCastingForDate = (day: number): CastingDate | undefined => {
    const dateStr = `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return castingDates.find((casting) => casting.date === dateStr);
  };

  // 날짜 클릭 핸들러
  const handleDateClick = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const existingCasting = getCastingForDate(day);

    setSelectedDate(dateStr);
    if (existingCasting) {
      setFormData({ show: existingCasting.show, time: existingCasting.time || "" });
    } else {
      setFormData({ show: "", time: "" });
    }
    setShowForm(true);
  };

  // 공연 정보 저장
  const handleSave = () => {
    if (!selectedDate || !formData.show) return;

    const existingIndex = castingDates.findIndex((c) => c.date === selectedDate);

    if (existingIndex >= 0) {
      // 기존 데이터 수정
      const updated = [...castingDates];
      updated[existingIndex] = {
        date: selectedDate,
        show: formData.show,
        time: formData.time,
      };
      setCastingDates(updated);
    } else {
      // 새 데이터 추가
      setCastingDates([
        ...castingDates,
        {
          date: selectedDate,
          show: formData.show,
          time: formData.time,
        },
      ]);
    }

    setShowForm(false);
    setSelectedDate(null);
    setFormData({ show: "", time: "" });
  };

  // 공연 정보 삭제
  const handleDelete = () => {
    if (!selectedDate) return;

    setCastingDates(castingDates.filter((c) => c.date !== selectedDate));
    setShowForm(false);
    setSelectedDate(null);
    setFormData({ show: "", time: "" });
  };

  // 폼 닫기
  const handleCancel = () => {
    setShowForm(false);
    setSelectedDate(null);
    setFormData({ show: "", time: "" });
  };

  // 달력 날짜 배열 생성
  const calendarDays = [];
  // 빈 칸 채우기 (첫 주 시작 전)
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarDays.push(null);
  }
  // 실제 날짜 채우기
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const monthNames = [
    "1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월"
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold mb-4 text-center text-neutral-800">
        {actorName} 캐스팅 일정
      </h3>

      {/* 월/년도 선택 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPrevMonth}
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h4 className="text-xl font-bold text-neutral-700">
          {currentYear}년 {monthNames[currentMonth - 1]}
        </h4>

        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map((day, index) => (
          <div
            key={day}
            className={`text-center font-bold text-sm py-2 ${
              index === 0 ? "text-red-500" : index === 6 ? "text-blue-500" : "text-neutral-600"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 달력 날짜 */}
      <div className="grid grid-cols-7 gap-3">
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="h-32" />;
          }

          const casting = getCastingForDate(day);
          const isWeekend = index % 7 === 0 || index % 7 === 6;
          const isSunday = index % 7 === 0;

          return (
            <div
              key={day}
              onClick={() => handleDateClick(day)}
              className={`h-32 flex flex-col items-center justify-start p-3 rounded-lg border-2 transition-all cursor-pointer ${
                casting
                  ? "bg-amber-500 border-amber-600 text-white font-bold hover:bg-amber-600 shadow-lg hover:shadow-xl"
                  : "border-neutral-200 hover:border-amber-400 hover:bg-amber-50"
              }`}
            >
              <span
                className={`text-lg font-bold mb-2 ${
                  casting ? "text-white" : isSunday ? "text-red-500" : isWeekend ? "text-blue-500" : "text-neutral-700"
                }`}
              >
                {day}
              </span>
              {casting && (
                <div className="text-sm text-white text-center leading-snug w-full flex-1 flex flex-col justify-center">
                  <div className="font-bold mb-1 line-clamp-2">
                    {casting.show}
                  </div>
                  {casting.time && (
                    <div className="text-xs opacity-95 font-semibold">{casting.time}</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 입력 폼 모달 */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h5 className="text-xl font-bold mb-4 text-neutral-800">
              공연 정보 {getCastingForDate(parseInt(selectedDate?.split("-")[2] || "0")) ? "수정" : "추가"}
            </h5>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  날짜
                </label>
                <input
                  type="text"
                  value={selectedDate || ""}
                  disabled
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg bg-neutral-50 text-neutral-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  공연 제목 *
                </label>
                <input
                  type="text"
                  value={formData.show}
                  onChange={(e) => setFormData({ ...formData, show: e.target.value })}
                  placeholder="예: 레베카"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  관람 시간
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleSave}
                  disabled={!formData.show}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:bg-neutral-300 text-white py-2 rounded-lg font-medium transition-colors"
                >
                  저장
                </button>
                {getCastingForDate(parseInt(selectedDate?.split("-")[2] || "0")) && (
                  <button
                    onClick={handleDelete}
                    className="px-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-colors"
                  >
                    삭제
                  </button>
                )}
                <button
                  onClick={handleCancel}
                  className="px-4 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 py-2 rounded-lg font-medium transition-colors"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 범례 */}
      <div className="mt-6 pt-4 border-t border-neutral-200">
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-amber-500 border-2 border-amber-600 rounded"></div>
            <span className="text-neutral-600">캐스팅 날짜</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-neutral-200 rounded"></div>
            <span className="text-neutral-600">클릭하여 추가</span>
          </div>
        </div>
      </div>

      {/* 공연 목록 */}
      {castingDates.filter(c => {
        const [year, month] = c.date.split("-").map(Number);
        return year === currentYear && month === currentMonth;
      }).length > 0 && (
        <div className="mt-6 pt-4 border-t border-neutral-200">
          <h5 className="font-bold text-sm mb-3 text-neutral-700">이번 달 공연</h5>
          <div className="space-y-2">
            {castingDates
              .filter(c => {
                const [year, month] = c.date.split("-").map(Number);
                return year === currentYear && month === currentMonth;
              })
              .sort((a, b) => a.date.localeCompare(b.date))
              .map((casting, idx) => {
                const [, , day] = casting.date.split("-");
                return (
                  <div
                    key={idx}
                    onClick={() => handleDateClick(parseInt(day))}
                    className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200 hover:bg-amber-100 cursor-pointer transition-colors"
                  >
                    <span className="font-bold text-amber-700 text-lg">{parseInt(day)}일</span>
                    <div className="flex-1">
                      <p className="font-medium text-neutral-800">{casting.show}</p>
                      {casting.time && (
                        <p className="text-sm text-neutral-600">{casting.time}</p>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
