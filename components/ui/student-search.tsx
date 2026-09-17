"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2, Check } from "lucide-react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

export interface Student {
  name: string;
  rollNo: string;
  regNo: string;
  department: string;
  semester: string;
}

interface StudentSearchProps {
  onSelect: (student: Student) => void;
  departmentFilter?: string; // Optional: Prioritize this department
  placeholder?: string;
  className?: string;
}

export function StudentSearch({ onSelect, departmentFilter, placeholder = "Search by Name or Roll No...", className }: StudentSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxzGJ9V_itGjzT24JlXbxim21DeoFnKd6zuTHOV59S1UDm471h0nATDGiN6AFXr0GwO/exec";
        const res = await fetch(`${GOOGLE_SCRIPT_URL}?action=get_students`);
        
        if (res.ok) {
          const data = await res.json();
          setStudents(Array.isArray(data) ? data : (data.students || []));
        }
      } catch (error) {
        console.error("Failed to fetch students", error);
      } finally {
        setLoading(false);
        setHasFetched(true);
      }
    };
    
    // Only fetch when they focus the input
    if (isOpen && !hasFetched && !loading) {
      fetchStudents();
    }
  }, [isOpen, hasFetched, loading]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredStudents = students
    .filter((s) => {
      const searchStr = `${s.name} ${s.rollNo} ${s.regNo || ''}`.toLowerCase();
      return searchStr.includes(query.toLowerCase());
    })
    .sort((a, b) => {
      // Prioritize the selected department
      if (departmentFilter) {
        if (a.department === departmentFilter && b.department !== departmentFilter) return -1;
        if (a.department !== departmentFilter && b.department === departmentFilter) return 1;
      }
      return 0;
    })
    .slice(0, 8); // Show max 8 results for performance

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700/60" />
        <Input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="pl-9 h-11"
        />
        {loading && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500 animate-spin" />}
      </div>

      {isOpen && (query.trim().length > 0 || students.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-[#0c0704] border border-amber-900/60 rounded-md shadow-xl overflow-hidden max-h-60 overflow-y-auto custom-scrollbar">
          {!loading && filteredStudents.length === 0 && (
            <div className="p-4 text-center text-xs text-amber-700 font-mono">
              No students found. Type a custom name if needed.
            </div>
          )}
          {filteredStudents.map((student, idx) => (
            <button
              key={`${student.rollNo}-${idx}`}
              type="button"
              onClick={() => {
                onSelect(student);
                setQuery("");
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 border-b border-amber-900/20 hover:bg-amber-950/40 focus:bg-amber-950/40 transition-colors flex items-center justify-between group cursor-pointer"
            >
              <div>
                <p className="text-sm font-semibold text-amber-100 group-hover:text-amber-300">{student.name}</p>
                <div className="flex gap-2 items-center mt-1">
                  <span className="text-[10px] font-mono text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded uppercase">{student.rollNo}</span>
                  {student.regNo && <span className="text-[10px] font-mono text-amber-600 border border-amber-900/50 px-1.5 py-0.5 rounded uppercase">{student.regNo}</span>}
                  <span className="text-[10px] text-amber-700">{student.department} · {student.semester}</span>
                </div>
              </div>
              <Check className="w-4 h-4 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
          
          {/* Allow custom entry if not found */}
          {query.trim().length > 0 && (
            <button
              type="button"
              onClick={() => {
                onSelect({ name: query, rollNo: "", regNo: "", department: "", semester: "" });
                setQuery("");
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 bg-amber-950/20 hover:bg-amber-900/30 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-amber-900/40 flex items-center justify-center text-amber-400 text-xs font-bold">+</div>
              <div>
                <p className="text-xs text-amber-200">Add custom participant</p>
                <p className="text-[10px] text-amber-600 font-mono truncate">&quot;{query}&quot;</p>
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
