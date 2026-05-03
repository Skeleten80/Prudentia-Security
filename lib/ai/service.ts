export const generateDailySummary=async()=>`No critical threats were detected overnight. Four motion events were recorded.`;
export const generateWeeklySummary=async()=>`Weekly status stable. One camera battery requires maintenance.`;
export const classifyEventSeverity=async()=>`Medium`;
export const suggestSecurityImprovements=async()=>[`Enable battery alerts for backyard camera`,`Confirm garage camera firmware is current`];
export const answerSecurityQuestion=async(q:string)=>`Mock AI response for: ${q}`;
