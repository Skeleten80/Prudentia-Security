import { describe, it, expect } from 'vitest';
import { ruleSchema } from '@/lib/validators';

describe('rule schema', ()=>{
  it('accepts valid payload', ()=>{
    const payload={name:'Night Motion Alert',triggerType:'motion',condition:'after 23:00',timeWindow:'23:00-06:00',action:'critical alert',severity:'High',enabled:true};
    expect(ruleSchema.safeParse(payload).success).toBe(true);
  });
});
