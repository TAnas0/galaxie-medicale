/**
 * Attribute Priority Configuration
 * 
 * Defines the display order for product attributes based on:
 * - Attribute category importance
 * - Product category relevance
 * - Canonical attribute names
 * 
 * Lower priority number = displayed first (higher importance)
 */

export interface AttributeCategoryPriority {
  [category: string]: number;
}

export interface AttributeNamePriority {
  [productCategory: string]: {
    [canonicalName: string]: number;
  };
}

/**
 * Category importance order
 * Defines the base priority for attribute categories
 */
export const ATTRIBUTE_CATEGORY_PRIORITY: AttributeCategoryPriority = {
  'Regulatory': 1,      // Device class, regulatory info
  'Functional': 2,      // Core functionality, what the device does
  'Controls': 3,        // User controls, interfaces, parameters
  'Performance': 4,     // Performance specs, capabilities
  'Physical': 5,        // Dimensions, weight, materials
  'Motion': 6,          // Movement capabilities (for furniture/tables)
  'Thermal': 7,         // Temperature specs
  'Pressure': 8,        // Pressure specs
  'Safety': 9,          // Safety features
  'Electrical': 10,     // Power, consumption (often less critical to show first)
  'Interface': 11,      // Data ports, display options
  'Technical': 12,      // Technical details
  'Accessories': 13,    // Included accessories
};

/**
 * Canonical name priority by product category
 * Allows fine-grained control over specific attributes for specific product types
 */
export const ATTRIBUTE_NAME_PRIORITY: AttributeNamePriority = {
  // Sterilization equipment (autoclaves)
  'sterilisation': {
    'device_class': 1,                    // Regulatory class (IIb, etc.)
    'chamber_capacity': 2,                // Critical spec - how much can it sterilize
    'chamber_dimensions': 3,              // Physical capacity
    'vacuum_system': 4,                   // Sterilization method
    'temperature_sterilization': 5,       // Operating temperature
    'integrated_tests': 6,                // Built-in validation tests
    'integrated_printer_availability': 7, // Documentation capability
    'material': 10,                       // Chamber material
    'external_dimensions': 15,            // Overall size
    'power_consumption': 20,              // Less critical
    'net_weight': 25,                     // Secondary info
    'gross_weight': 30,                   // Packaging info
  },
  
  // Diagnostic equipment (monitors)
  'diagnostic': {
    'parametres_vitals': 1,               // What parameters it monitors - most critical
    'ecran': 2,                           // Screen size
    'affichage_courbes': 3,               // Display capabilities
    'alarmes': 4,                         // Safety features
    'interfaces': 5,                      // Connectivity
    'autonomie_batterie': 10,             // Battery life
    'poids': 15,                          // Weight
    'alimentation': 20,                   // Power supply
    'consommation': 21,                   // Power consumption
    'batterie_type': 25,                  // Battery type - less critical
  },
  
  // Medical furniture (trolleys, beds)
  'medical_furniture': {
    'dimensions': 1,                      // Overall size - critical for space planning
    'hauteur_ajustable': 2,               // Height range
    'roulettes': 3,                       // Mobility
    'barrieres_laterales': 5,             // Safety features
    'matelas': 10,                        // Included accessories
    'pompe_hydraulique': 11,              // Mechanism type
  },
  
  // Surgery equipment (operating tables)
  'surgery': {
    'dimensions': 1,                      // Table size
    'reglages': 2,                        // Adjustability - critical for surgical positioning
    'inclinaison_trendelenburg': 3,       // Trendelenburg capability
    'inclinaison_laterale': 4,            // Lateral tilt
    'glissement_horizontal': 5,           // Horizontal movement
    'freinage': 6,                        // Safety - braking system
    'batterie': 10,                       // Battery backup
    'matelas': 15,                        // Included accessories
  },
};

/**
 * Default priority for unknown categories
 */
export const DEFAULT_CATEGORY_PRIORITY = 50;

/**
 * Default priority for unknown attribute names
 */
export const DEFAULT_ATTRIBUTE_PRIORITY = 100;

/**
 * Priority boost for highlighted attributes
 * Subtracted from calculated priority to move highlighted items up
 */
export const HIGHLIGHTED_PRIORITY_BOOST = 50;
