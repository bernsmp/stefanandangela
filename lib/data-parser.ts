import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

export interface FingerprintSection {
  title: string;
  content: string;
  level: number;
  subsections?: FingerprintSection[];
}

export interface CognitivePattern {
  id: number;
  name: string;
  type: 'procedural' | 'conditional' | 'declarative' | 'metacognitive';
  description: string;
  executionSequence?: string[];
  evidenceInstances?: string[];
  frequencyData?: string;
  strategicValue?: string;
  unconsciousIndicators?: string[];
  blindSpotRisk?: string;
}

export interface BlindSpot {
  id: number;
  title: string;
  description: string;
  evidence: string[];
  coverage?: string;
  cost?: string;
  solution?: string[];
}

export interface FingerprintData {
  title: string;
  metadata?: Record<string, string | number>;
  sections: FingerprintSection[];
  patterns?: CognitivePattern[];
  blindSpots?: BlindSpot[];
  rawContent: string;
}

export interface InterfaceSynergy {
  stefanPattern: string;
  angelaPattern: string;
  combinedEffect: string;
}

export interface InterfaceFriction {
  stefanPattern: string;
  angelaPattern: string;
  friction: string;
  resolution: string;
}

export interface LeadershipInterfaceMap {
  title: string;
  content: string;
  sections: FingerprintSection[];
  synergies?: InterfaceSynergy[];
  frictionPoints?: InterfaceFriction[];
  protocols?: FingerprintSection[];
  rawContent: string;
}

/**
 * Parse markdown file into structured data
 */
export function parseMarkdownFile(filePath: string): FingerprintData | LeadershipInterfaceMap {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return {
        title: path.basename(filePath, '.md'),
        sections: [],
        rawContent: '',
      };
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    if (!fileContent || fileContent.length === 0) {
      console.error(`Empty file: ${filePath}`);
      return {
        title: path.basename(filePath, '.md'),
        sections: [],
        rawContent: '',
      };
    }
    
    const { data: frontmatter, content } = matter(fileContent);
    
    // Limit content processing to prevent timeouts
    const sections = parseMarkdownSections(content);
    
    return {
      title: frontmatter.title || extractTitle(content) || path.basename(filePath, '.md'),
      metadata: frontmatter,
      sections,
      rawContent: content, // Keep full content but sections are parsed efficiently
    };
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
    return {
      title: path.basename(filePath, '.md'),
      sections: [],
      rawContent: '',
    };
  }
}

/**
 * Extract title from markdown content (first H1)
 */
function extractTitle(content: string): string {
  const h1Match = content.match(/^#\s+(.+)$/m);
  return h1Match ? h1Match[1].trim() : '';
}

/**
 * Parse markdown content into hierarchical sections
 * Optimized for large files
 */
function parseMarkdownSections(content: string): FingerprintSection[] {
  // Use regex to find all headings at once for better performance
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Array<{ level: number; title: string; index: number }> = [];
  let match;
  
  // Find all headings first
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      level: match[1].length,
      title: match[2].trim(),
      index: match.index,
    });
  }
  
  if (headings.length === 0) {
    // No headings found, return single section with all content
    return [{
      title: 'Content',
      content: content.trim(),
      level: 1,
    }];
  }
  
  const sections: FingerprintSection[] = [];
  const stack: FingerprintSection[] = [];
  
  // Process headings and extract content between them
  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    const nextIndex = i < headings.length - 1 ? headings[i + 1].index : content.length;
    
    // Extract content for this section
    const sectionStart = heading.index + heading.title.length + heading.level + 1;
    const sectionContent = content.substring(sectionStart, nextIndex).trim();
    
    const newSection: FingerprintSection = {
      title: heading.title,
      content: sectionContent,
      level: heading.level,
      subsections: [],
    };
    
    // Find parent section based on level
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop();
    }
    
    if (stack.length === 0) {
      sections.push(newSection);
    } else {
      const parent = stack[stack.length - 1];
      if (!parent.subsections) {
        parent.subsections = [];
      }
      parent.subsections.push(newSection);
    }
    
    stack.push(newSection);
  }
  
  return sections;
}

/**
 * Load fingerprint data from markdown file
 */
export function loadFingerprintData(fileName: string): FingerprintData {
  const filePath = path.join(process.cwd(), 'data', fileName);
  return parseMarkdownFile(filePath) as FingerprintData;
}

/**
 * Load leadership interface map data
 */
export function loadLeadershipInterfaceMap(): LeadershipInterfaceMap {
  const filePath = path.join(process.cwd(), 'data', 'leadership-interface-map.md');
  return parseMarkdownFile(filePath) as LeadershipInterfaceMap;
}

/**
 * Search through fingerprint data
 */
export function searchFingerprint(
  data: FingerprintData,
  query: string
): FingerprintSection[] {
  const results: FingerprintSection[] = [];
  const lowerQuery = query.toLowerCase();
  
  function searchSection(section: FingerprintSection): boolean {
    let found = false;
    
    if (
      section.title.toLowerCase().includes(lowerQuery) ||
      section.content.toLowerCase().includes(lowerQuery)
    ) {
      found = true;
    }
    
    if (section.subsections) {
      const subsectionFound = section.subsections.some(sub => searchSection(sub));
      if (subsectionFound) found = true;
    }
    
    if (found) {
      results.push(section);
    }
    
    return found;
  }
  
  data.sections.forEach(section => searchSection(section));
  return results;
}

/**
 * Extract patterns from fingerprint sections
 */
export function extractPatterns(sections: FingerprintSection[]): CognitivePattern[] {
  const patterns: CognitivePattern[] = [];
  let patternId = 0;
  let currentType: CognitivePattern['type'] = 'procedural';
  
  function processSection(section: FingerprintSection) {
    // Detect pattern type from section titles
    const titleLower = section.title.toLowerCase();
    if (titleLower.includes('procedural')) currentType = 'procedural';
    else if (titleLower.includes('conditional')) currentType = 'conditional';
    else if (titleLower.includes('declarative')) currentType = 'declarative';
    else if (titleLower.includes('metacognitive')) currentType = 'metacognitive';
    
    // Check if this is a pattern section (usually starts with "PATTERN" or contains pattern description)
    const patternMatch = section.title.match(/PATTERN\s*(\d+):\s*(.+)/i) || 
                        section.title.match(/Pattern\s*(\d+):\s*(.+)/i);
    
    if (patternMatch) {
      patternId++;
      const pattern: CognitivePattern = {
        id: patternId,
        name: patternMatch[2].trim(),
        type: currentType,
        description: extractDescription(section.content),
        executionSequence: extractList(section.content, 'Execution Sequence'),
        evidenceInstances: extractEvidenceInstances(section.content),
        frequencyData: extractSection(section.content, 'Frequency Data'),
        strategicValue: extractSection(section.content, 'Strategic Value'),
        unconsciousIndicators: extractList(section.content, 'Unconscious Indicators'),
        blindSpotRisk: extractSection(section.content, 'Blind Spot') || extractSection(section.content, 'Cost'),
      };
      patterns.push(pattern);
    }
    
    // Process subsections
    if (section.subsections) {
      section.subsections.forEach(processSection);
    }
  }
  
  sections.forEach(processSection);
  return patterns;
}

/**
 * Extract a specific section's content
 */
function extractSection(content: string, sectionName: string): string | undefined {
  const regex = new RegExp(`\\*\\*${sectionName}[:\\s]*\\*\\*\\s*([^*]+?)(?=\\*\\*|$)`, 'is');
  const match = content.match(regex);
  return match ? match[1].trim() : undefined;
}

/**
 * Extract description (usually the first paragraph after **Pattern Description:**)
 */
function extractDescription(content: string): string {
  const descMatch = content.match(/\*\*Pattern Description:\*\*\s*(.+?)(?=\*\*|$)/is);
  if (descMatch) return descMatch[1].trim();
  
  // Fallback: first non-empty paragraph
  const firstPara = content.split('\n\n')[0];
  return firstPara?.trim() || '';
}

/**
 * Extract numbered or bulleted list items
 */
function extractList(content: string, sectionName: string): string[] | undefined {
  const sectionContent = extractSection(content, sectionName);
  if (!sectionContent) return undefined;
  
  const items: string[] = [];
  const lines = sectionContent.split('\n');
  
  for (const line of lines) {
    const listMatch = line.match(/^[\d*\-•]+[.)]\s*(.+)/);
    if (listMatch) {
      items.push(listMatch[1].trim());
    }
  }
  
  return items.length > 0 ? items : undefined;
}

/**
 * Extract evidence instances
 */
function extractEvidenceInstances(content: string): string[] | undefined {
  const instances: string[] = [];
  const instanceMatches = content.matchAll(/\*\*Instance\s*\d+[^*]*\*\*[:\s]*([^*]+?)(?=\*\*Instance|\*\*Frequency|$)/gis);
  
  for (const match of instanceMatches) {
    instances.push(match[1].trim());
  }
  
  return instances.length > 0 ? instances : undefined;
}

/**
 * Extract blind spots from fingerprint data
 */
export function extractBlindSpots(sections: FingerprintSection[]): BlindSpot[] {
  const blindSpots: BlindSpot[] = [];
  let blindSpotId = 0;
  
  function processSection(section: FingerprintSection) {
    const blindSpotMatch = section.title.match(/BLIND SPOT\s*(\d+):\s*(.+)/i);
    
    if (blindSpotMatch) {
      blindSpotId++;
      blindSpots.push({
        id: blindSpotId,
        title: blindSpotMatch[2].trim(),
        description: extractDescription(section.content),
        evidence: extractList(section.content, 'Evidence') || [],
        coverage: extractSection(section.content, 'Coverage'),
        cost: extractSection(section.content, 'Real Cost') || extractSection(section.content, 'Cost'),
        solution: extractList(section.content, 'Solution Protocol'),
      });
    }
    
    if (section.subsections) {
      section.subsections.forEach(processSection);
    }
  }
  
  sections.forEach(processSection);
  return blindSpots;
}

/**
 * Get pattern type color
 */
export function getPatternTypeColor(type: CognitivePattern['type']): string {
  const colors = {
    procedural: '#ffb829',
    conditional: '#3498db',
    declarative: '#9b59b6',
    metacognitive: '#1abc9c',
  };
  return colors[type];
}

/**
 * Get pattern type label
 */
export function getPatternTypeLabel(type: CognitivePattern['type']): string {
  const labels = {
    procedural: 'Procedural',
    conditional: 'Conditional', 
    declarative: 'Declarative',
    metacognitive: 'Metacognitive',
  };
  return labels[type];
}

