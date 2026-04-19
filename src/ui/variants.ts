import { cva } from 'class-variance-authority'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export { cva }

export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
