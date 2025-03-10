import { type ClassValue, clsx } from 'clsx'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { twMerge } from 'tailwind-merge'

dayjs.extend(utc)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Define a type for status keys
type TableStatusType = 'loading' | 'error' | 'empty'

export function getTableStatusMessage(
  isFetching: boolean,
  isError: boolean
): { type: TableStatusType; message: string } {
  if (isFetching) {
    return { type: 'loading', message: 'Fetching records...' }
  }
  if (isError) {
    return { type: 'error', message: 'Error fetching data. Please try again.' }
  }
  return { type: 'empty', message: 'No data available.' }
}

export function generateAvatar(firstName: string, lastName: string) {
  return (
    firstName.slice(0, 1).toUpperCase() + lastName.slice(0, 1).toUpperCase()
  )
}

export const getUTCDateRange = (from: Date, to: Date) => ({
  from: dayjs(from).utc().toISOString(),
  to: dayjs(to).endOf('day').utc().toISOString(),
})
