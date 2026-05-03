import { IntegrationProvider } from './types';export const mockProvider=(name:string,status:'connected'|'needs_attention'|'not_configured'):IntegrationProvider=>({name,checkStatus:async()=>status});
