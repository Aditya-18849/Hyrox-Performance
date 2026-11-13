import { createContext, useContext, useState, type ReactNode } from 'react';

/** Lets service panels pre-select the "coaching interest" field of the contact form. */
type Ctx = { interest: string; setInterest: (v: string) => void };
const InquiryContext = createContext<Ctx>({ interest: '', setInterest: () => {} });

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [interest, setInterest] = useState('');
  return <InquiryContext.Provider value={{ interest, setInterest }}>{children}</InquiryContext.Provider>;
}
export const useInquiry = () => useContext(InquiryContext);
