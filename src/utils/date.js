export const dateStr = (offset = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const todayStr = () => dateStr(0);

export const yesterdayStr = () => dateStr(-1);

export const isDue = (entry) => Boolean(entry && entry.d <= todayStr());

export const formatDate = (value) => {
  if (!value) return '-';
  const d = new Date(value + 'T00:00:00');
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const stripHarakat = (text = '') => text.replace(/[\u064B-\u065F\u0670]/g, '');
