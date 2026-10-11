import {clsx,type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";
export const cn=(...a:ClassValue[])=>twMerge(clsx(a));
/** ₹ Lakhs → "₹X L" / "₹X.XX Cr" */
export const inr=(l:number)=>l>=100?`₹${(l/100).toFixed(2)} Cr`:`₹${l.toFixed(1)} L`;
