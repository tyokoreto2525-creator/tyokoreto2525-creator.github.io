// クリックを一括監視（後から増えるカードにも効く）
document.addEventListener('click', (e) => {
  const button = e.target.closest('.toggle-button');
  if (!button) return;

  const caption = button.nextElementSibling;
  if (!caption || !caption.classList.contains('caption')) return;

  const expanding = !caption.classList.contains('expanded');

  if (expanding) {
    // 開く：実高さを測ってからmax-heightに設定
    caption.style.maxHeight = 'none';
    const h = caption.scrollHeight;
    caption.style.maxHeight = '0px';
    requestAnimationFrame(() => {
      caption.classList.add('expanded');
      caption.style.maxHeight = h + 'px';
      button.textContent = '▲ 閉じる';
      button.setAttribute('aria-expanded', 'true');
    });
  } else {
    // 閉じる：今の高さから0へ
    const h = caption.scrollHeight;
    caption.style.maxHeight = h + 'px';
    requestAnimationFrame(() => {
      caption.classList.remove('expanded');
      caption.style.maxHeight = '0px';
      button.textContent = '▼ 詳細を見る';
      button.setAttribute('aria-expanded', 'false');
    });
  }

  // 開き終わったらinlineのmax-heightを解除（再計測の邪魔をしない）
  const tidy = (ev) => {
    if (ev.propertyName === 'max-height' && caption.classList.contains('expanded')) {
      caption.style.maxHeight = 'none';
    }
    caption.removeEventListener('transitionend', tidy);
  };
  caption.addEventListener('transitionend', tidy);
});
