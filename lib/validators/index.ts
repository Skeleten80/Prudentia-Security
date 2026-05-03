import { z } from 'zod';
export const ruleSchema=z.object({name:z.string().min(2),triggerType:z.string(),deviceId:z.string().optional(),condition:z.string(),timeWindow:z.string(),action:z.string(),severity:z.enum(['Low','Medium','High','Critical']),enabled:z.boolean()});
