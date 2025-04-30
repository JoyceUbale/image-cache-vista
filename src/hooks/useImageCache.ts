
import { useState, useEffect } from 'react';

// Cache expiration time (24 hours in milliseconds)
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000;

// In-memory cache
const memoryCache = new Map<string, string>();

export const useImageCache = () => {
  // Function to check if the image is in localStorage
  const getFromLocalStorage = (key: string): string | null => {
    try {
      const cacheData = localStorage.getItem(`image_cache_${key}`);
      
      if (!cacheData) {
        return null;
      }
      
      const { timestamp, url } = JSON.parse(cacheData);
      
      // Check if cache has expired
      if (Date.now() - timestamp > CACHE_EXPIRATION) {
        localStorage.removeItem(`image_cache_${key}`);
        return null;
      }
      
      return url;
    } catch (error) {
      console.error('Error getting from localStorage:', error);
      return null;
    }
  };
  
  // Function to save image to localStorage
  const saveToLocalStorage = (key: string, url: string): void => {
    try {
      const cacheData = {
        timestamp: Date.now(),
        url,
      };
      
      localStorage.setItem(`image_cache_${key}`, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };
  
  // Main function to get cached image URL
  const getCachedImage = (url: string): string => {
    // Check if image is in memory cache
    if (memoryCache.has(url)) {
      return memoryCache.get(url)!;
    }
    
    // Check if image is in localStorage
    const cachedUrl = getFromLocalStorage(url);
    if (cachedUrl) {
      // Save to memory cache and return
      memoryCache.set(url, cachedUrl);
      return cachedUrl;
    }
    
    // If not in cache, cache it now
    // For local file references, we just store the URL itself
    memoryCache.set(url, url);
    saveToLocalStorage(url, url);
    
    return url;
  };
  
  return {
    getCachedImage,
  };
};
