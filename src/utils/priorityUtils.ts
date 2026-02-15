/**
 * Priority Utility Functions
 * 
 * Provides functions to calculate priorities and sort attributes, certifications, and standards
 * based on configuration files and product context.
 */

import {
  CERTIFICATION_PRIORITY,
  STANDARD_PRIORITY,
  DEFAULT_PRIORITY,
  type CertificationPriorityConfig,
  type StandardPriorityConfig,
} from '../config/certificationPriority';

import {
  ATTRIBUTE_CATEGORY_PRIORITY,
  ATTRIBUTE_NAME_PRIORITY,
  DEFAULT_CATEGORY_PRIORITY,
  DEFAULT_ATTRIBUTE_PRIORITY,
  HIGHLIGHTED_PRIORITY_BOOST,
} from '../config/attributePriority';

/**
 * Get priority for a certification
 * @param certId - Certification ID (e.g., 'ce', 'iso-13485')
 * @param productCategory - Product category (e.g., 'diagnostic', 'sterilisation')
 * @returns Priority number (lower = higher priority)
 */
export function getCertificationPriority(
  certId: string,
  productCategory?: string
): number {
  // Try category-specific priority first
  if (productCategory && CERTIFICATION_PRIORITY.byCategory[productCategory]) {
    const categoryPriority = CERTIFICATION_PRIORITY.byCategory[productCategory][certId];
    if (categoryPriority !== undefined) {
      return categoryPriority;
    }
  }
  
  // Fall back to global priority
  const globalPriority = CERTIFICATION_PRIORITY.global[certId];
  if (globalPriority !== undefined) {
    return globalPriority;
  }
  
  // Unknown certification - use default
  return DEFAULT_PRIORITY;
}

/**
 * Get priority for a standard
 * @param standardName - Standard name (e.g., 'IEC 60601-1', 'EN 13060')
 * @param productCategory - Product category
 * @returns Priority number (lower = higher priority)
 */
export function getStandardPriority(
  standardName: string,
  productCategory?: string
): number {
  // Try category-specific priority first
  if (productCategory && STANDARD_PRIORITY.byCategory[productCategory]) {
    const categoryPriority = STANDARD_PRIORITY.byCategory[productCategory][standardName];
    if (categoryPriority !== undefined) {
      return categoryPriority;
    }
  }
  
  // Fall back to global priority
  const globalPriority = STANDARD_PRIORITY.global[standardName];
  if (globalPriority !== undefined) {
    return globalPriority;
  }
  
  // Unknown standard - use default
  return DEFAULT_PRIORITY;
}

/**
 * Get priority for an attribute
 * Uses a hybrid approach:
 * 1. If attribute has explicit priority field, use it
 * 2. Otherwise, calculate based on canonical name (if configured)
 * 3. Otherwise, calculate based on category
 * 4. Apply boost for highlighted attributes
 * 
 * @param attribute - Product attribute object
 * @param productCategory - Product category
 * @returns Priority number (lower = higher priority)
 */
export function getAttributePriority(
  attribute: any,
  productCategory?: string
): number {
  // 1. Explicit priority override (highest precedence)
  if (attribute.priority !== undefined && attribute.priority !== null) {
    return attribute.priority;
  }
  
  let calculatedPriority = DEFAULT_ATTRIBUTE_PRIORITY;
  
  // 2. Try canonical name priority for this product category
  if (
    productCategory &&
    attribute.canonical_name &&
    ATTRIBUTE_NAME_PRIORITY[productCategory]
  ) {
    const namePriority = ATTRIBUTE_NAME_PRIORITY[productCategory][attribute.canonical_name];
    if (namePriority !== undefined) {
      calculatedPriority = namePriority;
    }
  }
  
  // 3. If no name-based priority, use category-based priority
  if (calculatedPriority === DEFAULT_ATTRIBUTE_PRIORITY && attribute.category) {
    const categoryPriority = ATTRIBUTE_CATEGORY_PRIORITY[attribute.category];
    if (categoryPriority !== undefined) {
      calculatedPriority = categoryPriority;
    } else {
      calculatedPriority = DEFAULT_CATEGORY_PRIORITY;
    }
  }
  
  // 4. Apply boost for highlighted attributes
  if (attribute.highlighted === true) {
    calculatedPriority = Math.max(0, calculatedPriority - HIGHLIGHTED_PRIORITY_BOOST);
  }
  
  return calculatedPriority;
}

/**
 * Sort attributes by priority
 * @param attributes - Array of product attributes
 * @param productCategory - Product category
 * @returns Sorted array of attributes (lowest priority number first)
 */
export function sortAttributes(
  attributes: any[],
  productCategory?: string
): any[] {
  if (!attributes || attributes.length === 0) {
    return [];
  }
  
  return [...attributes].sort((a, b) => {
    const priorityA = getAttributePriority(a, productCategory);
    const priorityB = getAttributePriority(b, productCategory);
    
    // Primary sort: by priority
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    
    // Secondary sort: preserve original order (stable sort)
    return 0;
  });
}

/**
 * Sort certifications by priority
 * @param certifications - Array of certification objects (from getEntries)
 * @param productCategory - Product category
 * @returns Sorted array of certifications
 */
export function sortCertifications(
  certifications: any[],
  productCategory?: string
): any[] {
  if (!certifications || certifications.length === 0) {
    return [];
  }
  
  return [...certifications].sort((a, b) => {
    const priorityA = getCertificationPriority(a.id, productCategory);
    const priorityB = getCertificationPriority(b.id, productCategory);
    
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    
    // Secondary sort: alphabetically by name
    return (a.data?.name || '').localeCompare(b.data?.name || '');
  });
}

/**
 * Sort standards by priority
 * @param standards - Array of standard name strings
 * @param productCategory - Product category
 * @returns Sorted array of standard names
 */
export function sortStandards(
  standards: string[],
  productCategory?: string
): string[] {
  if (!standards || standards.length === 0) {
    return [];
  }
  
  return [...standards].sort((a, b) => {
    const priorityA = getStandardPriority(a, productCategory);
    const priorityB = getStandardPriority(b, productCategory);
    
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    
    // Secondary sort: alphabetically
    return a.localeCompare(b);
  });
}

/**
 * Get top N certifications by priority
 * Useful for displaying only the most important certifications
 */
export function getTopCertifications(
  certifications: any[],
  productCategory: string | undefined,
  count: number
): any[] {
  const sorted = sortCertifications(certifications, productCategory);
  return sorted.slice(0, count);
}

/**
 * Get top N standards by priority
 */
export function getTopStandards(
  standards: string[],
  productCategory: string | undefined,
  count: number
): string[] {
  const sorted = sortStandards(standards, productCategory);
  return sorted.slice(0, count);
}

/**
 * Check if a certification should be highlighted (top priority)
 * @param certId - Certification ID
 * @param productCategory - Product category
 * @param threshold - Priority threshold (certifications with priority <= threshold are highlighted)
 * @returns true if certification should be highlighted
 */
export function shouldHighlightCertification(
  certId: string,
  productCategory: string | undefined,
  threshold: number = 5
): boolean {
  const priority = getCertificationPriority(certId, productCategory);
  return priority <= threshold;
}

/**
 * Check if a standard should be highlighted
 */
export function shouldHighlightStandard(
  standardName: string,
  productCategory: string | undefined,
  threshold: number = 5
): boolean {
  const priority = getStandardPriority(standardName, productCategory);
  return priority <= threshold;
}
