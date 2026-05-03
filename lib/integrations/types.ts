export type IntegrationStatus='connected'|'needs_attention'|'not_configured';export interface IntegrationProvider{name:string;checkStatus:()=>Promise<IntegrationStatus>;}
