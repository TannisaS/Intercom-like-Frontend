import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, options: Intl.DateTimeFormatOptions = {}) {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  };
  
  return new Date(date).toLocaleDateString('en-US', defaultOptions);
}

export function formatTime(date: string | Date) {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
}

export function formatDateTime(date: string | Date) {
  return `${formatDate(date)} at ${formatTime(date)}`;
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getInitials(name: string) {
  if (!name) return '';
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getStatusColor(status: string) {
  switch (status) {
    case 'online':
      return 'bg-success-500';
    case 'away':
      return 'bg-warning-500';
    case 'offline':
      return 'bg-gray-400';
    case 'open':
      return 'bg-primary-500';
    case 'pending':
      return 'bg-warning-500';
    case 'closed':
      return 'bg-success-500';
    case 'high':
      return 'bg-error-500';
    case 'medium':
      return 'bg-warning-500';
    case 'low':
      return 'bg-gray-400';
    default:
      return 'bg-gray-400';
  }
}

export function getNameForId(id: string | null, users: Array<{ id: string; name: string }>) {
  if (!id) return 'Unassigned';
  const user = users.find(user => user.id === id);
  return user ? user.name : 'Unknown';
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}