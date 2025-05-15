export const slugify = (text) => {
    if (!text) return '';
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')           // Boşlukları - ile değiştir
      .replace(/[^\w-]+/g, '')       // Alfanümerik olmayan karakterleri (tire hariç) kaldır
      .replace(/--+/g, '-');          // Birden fazla tireyi tek tireye indir
  };