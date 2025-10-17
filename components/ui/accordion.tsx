import * as React from "react";
export function Accordion({ children }: {children: React.ReactNode}) { return <div>{children}</div>; }
export function AccordionItem({ children }: {children: React.ReactNode}) { return <div className="border-b">{children}</div>; }
export function AccordionTrigger({ children }: {children: React.ReactNode}) { return <div className="flex cursor-pointer items-center justify-between py-3 font-medium">{children}</div>; }
export function AccordionContent({ children }: {children: React.ReactNode}) { return <div className="pb-4 text-sm text-gray-600">{children}</div>; }