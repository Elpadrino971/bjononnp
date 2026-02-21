"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeWindowProps {
  title?: string;
  code: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
}

function highlightSwiftUI(code: string): string {
  const keywords = [
    "struct", "var", "let", "func", "some", "body", "import", "if", "else",
    "return", "true", "false", "nil", "self", "private", "public", "internal",
    "class", "enum", "case", "switch", "for", "in", "while", "guard", "where",
    "@State", "@Binding", "@ObservedObject", "@EnvironmentObject", "@Published",
    "@ViewBuilder", "@main", "@StateObject", "View", "App", "Scene",
  ];

  const types = [
    "VStack", "HStack", "ZStack", "Text", "Button", "Image", "Color",
    "NavigationView", "NavigationStack", "List", "ScrollView", "GeometryReader",
    "Group", "ForEach", "LazyVStack", "LazyHStack", "Form", "Section",
    "TextField", "SecureField", "Toggle", "Slider", "Picker", "DatePicker",
    "Spacer", "Divider", "Rectangle", "Circle", "RoundedRectangle",
    "LinearGradient", "RadialGradient", "ContentView", "WindowGroup",
    "NavigationLink", "TabView", "Sheet", "Alert", "ActionSheet",
    "String", "Int", "Double", "Bool", "CGFloat", "CGSize", "CGRect",
  ];

  const modifiers = [
    "\.font\b", "\.foregroundColor\b", "\.background\b", "\.padding\b",
    "\.frame\b", "\.cornerRadius\b", "\.shadow\b", "\.opacity\b",
    "\.overlay\b", "\.clipShape\b", "\.navigationTitle\b", "\.toolbar\b",
    "\.onTapGesture\b", "\.onChange\b", "\.onAppear\b", "\.onDisappear\b",
    "\.bold\b", "\.italic\b", "\.underline\b", "\.strikethrough\b",
    "\.lineLimit\b", "\.multilineTextAlignment\b", "\.ignoresSafeArea\b",
    "\.listStyle\b", "\.buttonStyle\b", "\.accentColor\b", "\.tint\b",
    "\.animation\b", "\.transition\b", "\.scaleEffect\b", "\.rotationEffect\b",
    "\.offset\b", "\.zIndex\b", "\.id\b", "\.tag\b", "\.disabled\b",
  ];

  let html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Comments
  html = html.replace(/(\/\/[^\n]*)/g, '<span class="comment">$1</span>');
  // Strings
  html = html.replace(/"([^"]*)"/g, '<span class="str">"$1"</span>');
  // Numbers
  html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="num">$1</span>');

  modifiers.forEach((mod) => {
    const regex = new RegExp(mod.replace(/\\/g, "\\"), "g");
    html = html.replace(regex, (m) => `<span class="prop">${m}</span>`);
  });

  types.forEach((type) => {
    const regex = new RegExp(`\\b(${type})\\b`, "g");
    html = html.replace(regex, '<span class="type">$1</span>');
  });

  keywords.forEach((kw) => {
    const escaped = kw.replace(/[@]/g, "\\$&");
    const regex = new RegExp(`\\b(${escaped})\\b`, "g");
    html = html.replace(regex, '<span class="kw">$1</span>');
  });

  return html;
}

export default function CodeWindow({
  title = "ContentView.swift",
  code,
  language = "swift",
  className,
  showLineNumbers = true,
}: CodeWindowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className={cn("code-window", className)}>
      <div className="code-window-header justify-between">
        <div className="flex items-center gap-2">
          <div className="dot dot-red" />
          <div className="dot dot-yellow" />
          <div className="dot dot-green" />
          <span className="ml-2 text-xs text-slate-400 font-mono">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-mono">{language}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-violet-300 transition-colors cursor-pointer"
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="hover:bg-violet-500/5 transition-colors">
                {showLineNumbers && (
                  <td className="py-0.5 pl-4 pr-4 text-right text-xs text-slate-600 font-mono select-none w-10 border-r border-slate-800">
                    {i + 1}
                  </td>
                )}
                <td className="py-0.5 pl-4 pr-6">
                  <pre
                    className="text-sm font-mono text-slate-200 swiftui-syntax"
                    dangerouslySetInnerHTML={{
                      __html: highlightSwiftUI(line) || "&nbsp;",
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
