// 1. دالة حفظ أو حذف الأداة من الذاكرة
function toggleSave(toolId) {
    let savedTools = JSON.parse(localStorage.getItem('ai_gate_saved')) || [];
    const btn = document.getElementById('btn-' + toolId);

    if (savedTools.includes(toolId)) {
        // إذا كانت موجودة، احذفها
        savedTools = savedTools.filter(id => id !== toolId);
        if (btn) btn.classList.remove('active');
    } else {
        // إذا لم تكن موجودة، أضفها
        savedTools.push(toolId);
        if (btn) btn.classList.add('active');
    }

    // حفظ القائمة الجديدة في ذاكرة المتصفح
    localStorage.setItem('ai_gate_saved', JSON.stringify(savedTools));
}

// 2. دالة تشغيل "الذاكرة" عند فتح الموقع لتلوين القلوب المحفوظة
document.addEventListener('DOMContentLoaded', () => {
    let savedTools = JSON.parse(localStorage.getItem('ai_gate_saved')) || [];
    savedTools.forEach(toolId => {
        const btn = document.getElementById('btn-' + toolId);
        if (btn) {
            btn.classList.add('active');
        }
    });
});
