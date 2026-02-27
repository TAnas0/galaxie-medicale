/**
 * Certification and Standard Priority Configuration
 * 
 * Defines the display order for certifications and standards based on:
 * - Global importance (applies to all products)
 * - Category-specific relevance (overrides global for specific product categories)
 * 
 * Lower priority number = displayed first (higher importance)
 */

export interface CertificationPriorityConfig {
  global: Record<string, number>;
  byCategory: Record<string, Record<string, number>>;
}

export interface StandardPriorityConfig {
  global: Record<string, number>;
  byCategory: Record<string, Record<string, number>>;
}

/**
 * Certification Priority Configuration
 * Maps certification IDs to priority numbers
 */
export const CERTIFICATION_PRIORITY: CertificationPriorityConfig = {
  // Global priority - applies to all products unless overridden
  global: {
    'ce': 1,                    // CE marking - most common regulatory requirement
    'iso-13485': 2,             // Quality management for medical devices
    'fda': 3,                   // FDA approval - important for US market
    'en-13060': 10,             // Sterilization standard (specific to sterilizers)
    'iec-60601-1': 15,          // Medical electrical equipment safety
    'iec-60601-1-2': 16,        // EMC for medical electrical equipment
    'mdd-93-42-eec': 20,        // Medical Device Directive
    'ped-97-23-ec': 25,         // Pressure Equipment Directive
    'rohs': 30,                 // Environmental compliance
  },
  
  // Category-specific overrides
  byCategory: {
    // Sterilization equipment (autoclaves)
    'sterilisation': {
      'en-13060': 1,            // Most critical for sterilizers - Class B standard
      'ce': 2,
      'mdd-93-42-eec': 3,       // Medical device directive
      'ped-97-23-ec': 4,        // Pressure equipment directive (autoclaves use pressure)
      'iso-13485': 5,
    },
    
    // Diagnostic equipment (monitors, ECG, etc.)
    'diagnostic': {
      'iec-60601-1': 1,         // Electrical safety - critical for diagnostic devices
      'iec-60601-1-2': 2,       // EMC compliance
      'ce': 3,
      'iso-13485': 4,
      'fda': 5,
      'rohs': 10,
    },
    
    // Medical furniture (tables, trolleys, beds)
    'medical_furniture': {
      'ce': 1,
      'iso-13485': 2,
      // Furniture typically has fewer critical certifications
    },
    
    // Surgery equipment (operating tables, surgical lights)
    'surgery': {
      'ce': 1,
      'iso-13485': 2,
      'iec-60601-1': 3,         // If electrical
      'fda': 4,
    },
  },
};

/**
 * Standard Priority Configuration
 * Maps standard names (strings) to priority numbers
 */
export const STANDARD_PRIORITY: StandardPriorityConfig = {
  // Global priority
  global: {
    // IEC 60601 series - Medical electrical equipment
    'IEC 60601-1': 1,
    'IEC 60601-1-2': 2,
    'IEC 60601-2-27': 10,       // ECG monitors
    'IEC 60601-2-49': 11,       // Multiparameter monitors
    
    // ISO standards
    'ISO 13485': 3,             // Quality management
    'ISO 14971': 4,             // Risk management
    'EN ISO 14971': 4,          // Same as above (EN version)
    'ISO 10993': 5,             // Biocompatibility
    'ISO 14937': 15,            // Sterilization validation
    
    // EN standards for sterilization
    'EN 13060': 1,              // Small steam sterilizers
    'EN ISO 13485': 3,          // Quality management (EN version)
    'EN 61010-1': 20,           // Safety requirements for electrical equipment
    'EN 61010-2-040': 21,       // Sterilizers and washer-disinfectors
    'EN 61326': 22,             // EMC requirements
    'EN 13445': 23,             // Unfired pressure vessels
    'UNI EN ISO 13485': 3,      // Quality management (UNI EN version)
  },
  
  // Category-specific overrides
  byCategory: {
    // Sterilization equipment
    'sterilisation': {
      'EN 13060': 1,            // Most important for autoclaves
      'EN ISO 14971': 6,        // Risk management
      'EN 61010-1': 6,          // Electrical safety
      'EN 61010-2-040': 6,      // Specific to sterilizers
      'EN 13445': 5,            // Pressure vessels
      'EN 61326': 6,            // EMC
      'ISO 14937': 7,           // Sterilization validation
      'EN ISO 13485': 8,        // Quality management
      'UNI EN ISO 13485': 8,
    },
    
    // Diagnostic equipment (monitors)
    'diagnostic': {
      'IEC 60601-2-27': 1,      // ECG monitors - most specific
      'IEC 60601-2-49': 2,      // Multiparameter monitors
      'IEC 60601-1': 3,         // General electrical safety
      'IEC 60601-1-2': 4,       // EMC
      'ISO 14971': 5,           // Risk management
      'EN ISO 14971': 5,
      'ISO 13485': 6,           // Quality management
      'EN ISO 13485': 6,
    },
    
    // Medical furniture
    'medical_furniture': {
      'ISO 13485': 1,
      'EN ISO 13485': 1,
      'ISO 14971': 2,
      'EN ISO 14971': 2,
    },
    
    // Surgery equipment
    'surgery': {
      'IEC 60601-1': 1,         // If electrical
      'ISO 14971': 2,
      'EN ISO 14971': 2,
      'ISO 13485': 3,
      'EN ISO 13485': 3,
    },
  },
};

/**
 * Default priority for unknown certifications/standards
 */
export const DEFAULT_PRIORITY = 999;
