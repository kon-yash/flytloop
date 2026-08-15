export const PRODUCT_AREAS = ['reports','dashboard','missions','fleet','other','integrations','streaming'] as const;
export const TYPES = ['FEATURE_REQUEST','BUG','SUPPORT'] as const;
export const STAGES = ['NEW','TRIAGED','PRODUCT_REVIEW','PLANNED','IN_DEVELOPMENT','IN_TESTING','IN_STAGING','IN_PRODUCTION','SHIPPED','CUSTOMER_VALIDATION','CLOSED','DECLINED','SUPPORT_IN_PROGRESS'] as const;
export type FeedbackType = typeof TYPES[number];
export const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const sourceKey = (title: string) => `fr-${normalize(title).replace(/ /g, '-')}`;
export const toMoney = (value: string) => Number(value.replace(/[^0-9.]/g, '')) || 0;
export const issueType = (category: string): 'BUG'|'SUPPORT' => category === 'Bug' ? 'BUG' : 'SUPPORT';
export const stageFor = (status: string, type: FeedbackType) => {
  if (status === 'completed') return 'SHIPPED'; if (status === 'declined') return 'DECLINED'; if (status === 'in_progress') return 'IN_DEVELOPMENT';
  if (status === 'Closed') return 'CLOSED'; if (status === 'In Progress') return type === 'BUG' ? 'IN_DEVELOPMENT' : 'SUPPORT_IN_PROGRESS';
  return type === 'FEATURE_REQUEST' ? 'PRODUCT_REVIEW' : 'NEW';
};
export const impactScore = (item: { mentions: number; revenue: number; enterpriseCount: number; atRiskCount: number }) => Math.min(100, Math.round(22 + item.mentions * 3 + Math.min(25, item.revenue / 15000) + item.enterpriseCount * 4 + item.atRiskCount * 6));
