/* ProStaff HRIS · demo interactions. Local state only, no network. */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ── mobile nav ─────────────────────────────────────────────────── */
  var navToggle = $('#nav-toggle');
  var navLinks = $('#nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.getAttribute('data-open') === 'true';
      navLinks.setAttribute('data-open', String(!open));
      navToggle.setAttribute('aria-expanded', String(!open));
      navToggle.setAttribute('aria-label', open ? 'Buka menu navigasi' : 'Tutup menu navigasi');
    });
    $$('.nav__link, .nav__cta', navLinks).forEach(function (el) {
      el.addEventListener('click', function () {
        navLinks.setAttribute('data-open', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── demo dialog ────────────────────────────────────────────────── */
  var dlg = $('#demo-dialog');
  var dlgForm = $('#demo-form');
  var dlgOk = $('#demo-ok');
  var lastTrigger = null;

  function openDemo(trigger) {
    lastTrigger = trigger || null;
    if (!dlg) return;
    if (dlgOk) { dlgOk.hidden = true; dlgOk.textContent = ''; }
    if (typeof dlg.showModal === 'function') dlg.showModal();
    else dlg.setAttribute('open', '');
    var first = $('#d-name');
    if (first) first.focus();
  }
  function closeDemo() {
    if (!dlg) return;
    if (typeof dlg.close === 'function' && dlg.open) dlg.close();
    else dlg.removeAttribute('open');
    if (lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
  }

  $$('[data-demo]').forEach(function (b) {
    b.addEventListener('click', function () { openDemo(b); });
  });
  var closeBtn = $('#demo-close');
  if (closeBtn) closeBtn.addEventListener('click', closeDemo);
  if (dlg) {
    dlg.addEventListener('click', function (e) { if (e.target === dlg) closeDemo(); });
    dlg.addEventListener('close', function () {
      if (lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
    });
  }
  if (dlgForm) {
    dlgForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('#d-name').value.trim();
      var org = $('#d-org').value.trim();
      var mail = $('#d-mail').value.trim();
      var bad = null;
      [['#d-name', name], ['#d-org', org], ['#d-mail', mail]].forEach(function (p) {
        var el = $(p[0]);
        if (!p[1]) { bad = bad || el; }
        el.setAttribute('aria-invalid', p[1] ? 'false' : 'true');
      });
      if (mail && mail.indexOf('@') < 1) { bad = bad || $('#d-mail'); $('#d-mail').setAttribute('aria-invalid', 'true'); }
      if (bad) { bad.focus(); if (dlgOk) { dlgOk.hidden = false; dlgOk.textContent = 'Lengkapi nama, kantor, dan email yang valid.'; } return; }
      if (dlgOk) {
        dlgOk.hidden = false;
        dlgOk.textContent = 'Permintaan tercatat untuk ' + name + ' di ' + org + '. Demo ini tidak mengirim email; alamat tujuan adalah ' + mail + '.';
      }
    });
  }

  /* ── Library ────────────────────────────────────────────────────── */
  var TREE = [
    { name: 'Hukum', kids: ['Kebijakan / Retensi Dokumen', 'Kebijakan / Privasi Data', 'Perkara / Berkas Aktif'] },
    { name: 'Operasional', kids: ['SOP / Pengajuan Cuti', 'SOP / Lembur', 'SOP / Penomoran Dokumen'] },
    { name: 'SDM', kids: ['Penggajian / Komponen Gaji', 'Penggajian / Dokumen Pajak', 'Rubrik / Exam Teknis'] },
    { name: 'Teknik', kids: ['Standar / Kode', 'Standar / Catatan Rilis', 'Uji / Skenario'] }
  ];

  var DOCS = {
    'Hukum / Kebijakan / Retensi Dokumen': {
      crumbs: ['Hukum', 'Kebijakan', 'Retensi Dokumen'],
      title: 'Retensi Dokumen',
      body: [
        ['p', 'Setiap dokumen perkara disimpan minimal 5 tahun sejak tanggal penutupan. Dokumen yang memuat data pribadi pihak ketiga disimpan terpisah dan hanya dapat dibuka oleh pemilik folder.'],
        ['h4', 'Aturan penyimpanan'],
        ['ol', ['Berkas aktif: 0 sampai 12 bulan sejak diterima.', 'Berkas semiaktif: 12 sampai 60 bulan, akses baca saja.', 'Berkas arsip: setelah 60 bulan, disimpan sebagai satu berkas gabungan.']],
        ['p', 'Penghapusan dilakukan per kohort, bukan per berkas, agar jejak audit tetap utuh.'],
        ['pre', 'retensi:\n  aktif: 12 bulan\n  semiaktif: 48 bulan\n  arsip: permanen\n  pemilik: hukum/kebijakan']
      ],
      badge: 'Kursus',
      foot: ['versi 3 · 2026-08-14', 'pemilik: Divisi Hukum', 'tinjauan: tahunan']
    },
    'Operasional / SOP / Pengajuan Cuti': {
      crumbs: ['Operasional', 'SOP', 'Pengajuan Cuti'],
      title: 'Pengajuan Cuti',
      body: [
        ['p', 'Pengajuan cuti dibuat di modul Perizinan dan tidak memerlukan persetujuan berjenjang lebih dari satu atasan langsung. Pengaju memilih tanggal mulai dan selesai, lalu menuliskan keterangan serah terima pekerjaan.'],
        ['h4', 'Langkah'],
        ['ol', ['Tekan 1 untuk memilih jenis Cuti.', 'Isi tanggal mulai dan tanggal selesai.', 'Tekan Ctrl dan Enter untuk mengirim.']],
        ['p', 'Sisa cuti berkurang saat pengajuan disetujui, bukan saat dikirim. Pengajuan yang menunggu tidak mengunci jatah.'],
        ['pre', 'cuti:\n  jatah: 12\n  terpakai: 4\n  menunggu: 0\n  tersedia: 8\n  persetujuan: atasan_langsung']
      ],
      badge: 'Kursus',
      foot: ['versi 5 · 2026-09-02', 'pemilik: Operasional', 'tinjauan: semester']
    },
    'SDM / Penggajian / Dokumen Pajak': {
      crumbs: ['SDM', 'Penggajian', 'Dokumen Pajak'],
      title: 'Dokumen Pajak Karyawan',
      body: [
        ['p', 'Dokumen pajak disusun per karyawan per tahun takwim. Berkas memuat bukti potong, nomor pokok wajib pajak, dan status tanggungan yang berlaku pada periode tersebut.'],
        ['h4', 'Kapan diperbarui'],
        ['ol', ['Saat karyawan bergabung.', 'Saat status tanggungan berubah.', 'Saat penutupan periode Desember.']],
        ['p', 'Perubahan status tanggungan harus disertai dokumen pendukung. Tanpa dokumen, sistem memakai status terakhir yang tercatat.'],
        ['pre', 'pajak:\n  periode: 2026\n  status: kawin_2_tanggungan\n  bukti_potong: 1721-A1\n  format: pdf']
      ],
      badge: 'Arsip',
      foot: ['versi 2 · 2026-06-30', 'pemilik: Divisi SDM', 'tinjauan: tahunan']
    },
    'Operasional / SOP / Penomoran Dokumen': {
      crumbs: ['Operasional', 'SOP', 'Penomoran Dokumen'],
      title: 'Penomoran Dokumen',
      body: [
        ['p', 'Setiap dokumen operasional memakai nomor dengan pola tiga bagian: kode divisi, tahun, lalu urutan tiga digit. Nomor tidak pernah dipakai ulang, termasuk untuk dokumen yang dibatalkan.'],
        ['h4', 'Pola'],
        ['ol', ['Kode divisi: HK, OP, SD, atau TK.', 'Tahun empat digit.', 'Urutan tiga digit, dimulai dari 001 setiap Januari.']],
        ['p', 'Dokumen yang dibatalkan tetap menyimpan nomornya dengan penanda batal, agar rujukan lama tidak menunjuk ke dokumen lain.'],
        ['pre', 'nomor:\n  pola: \"{divisi}-{tahun}-{urut}\"\n  contoh: OP-2026-014\n  pakai_ulang: tidak']
      ],
      badge: 'Kursus',
      foot: ['versi 2 · 2026-04-08', 'pemilik: Operasional', 'tinjauan: tahunan']
    },
    'Teknik / Standar / Kode': {
      crumbs: ['Teknik', 'Standar', 'Kode'],
      title: 'Standar Kode',
      body: [
        ['p', 'Standar ini berlaku untuk semua repositori internal. Aturannya sengaja pendek agar bisa dibaca dalam satu kali duduk.'],
        ['h4', 'Empat aturan'],
        ['ol', ['Satu fungsi, satu tanggung jawab.', 'Nama variabel ditulis penuh, tanpa singkatan yang tidak lazim.', 'Komentar menjelaskan alasan, bukan langkah.', 'Setiap perubahan menyertakan satu berkas uji.']],
        ['pre', 'lint:\n  baris_maks: 100\n  indentasi: 2\n  kutip: tunggal\n  uji: wajib']
      ],
      badge: 'Kursus',
      foot: ['versi 4 · 2026-07-11', 'pemilik: Divisi Teknik', 'tinjauan: kuartal']
    },
    'Operasional / SOP / Lembur': {
      crumbs: ['Operasional', 'SOP', 'Lembur'],
      title: 'SOP Lembur',
      body: [
        ['p', 'Lembur diajukan sebelum hari kerja dimulai, kecuali untuk kejadian darurat yang dilaporkan pada hari yang sama. Setiap pengajuan menyebut durasi dalam jam dan pekerjaan yang diselesaikan.'],
        ['h4', 'Perhitungan'],
        ['p', 'Enam jam lembur pada hari kerja dihitung sebagai 1,5 kali upah per jam untuk jam pertama dan 2 kali untuk jam berikutnya. Hasilnya masuk ke baris lembur pada tabel gaji periode berjalan.'],
        ['pre', 'lembur:\n  jam: 6\n  tarif_per_jam: 77.553\n  nilai: 697.977\n  periode: 2026-10']
      ],
      badge: 'Kursus',
      foot: ['versi 6 · 2026-09-28', 'pemilik: Operasional', 'tinjauan: semester']
    },
    'SDM / Rubrik / Exam Teknis': {
      crumbs: ['SDM', 'Rubrik', 'Exam Teknis'],
      title: 'Rubrik Exam Teknis',
      body: [
        ['p', 'Empat kriteria dengan bobot tetap. Penilai memberi skor 0 sampai 4 per kriteria, lalu sistem menghitung nilai akhir pada skala 100.'],
        ['ol', ['Analisis masalah, bobot 40.', 'Kualitas solusi, bobot 30.', 'Kejelasan komunikasi, bobot 20.', 'Ketepatan waktu, bobot 10.']],
        ['pre', 'rubrik:\n  analisis: 40\n  solusi: 30\n  komunikasi: 20\n  waktu: 10\n  ambang_lulus: 70']
      ],
      badge: 'Kursus',
      foot: ['versi 3 · 2026-05-19', 'pemilik: Divisi SDM', 'tinjauan: tahunan']
    }
  };

  var treeEl = $('#lib-tree');
  var resultsEl = $('#lib-results');
  var docEl = $('#lib-doc');
  var searchEl = $('#lib-search');
  var countEl = $('#lib-count');
  var modeEl = $('#lib-mode');
  var activeDoc = 'Operasional / SOP / Pengajuan Cuti';
  var mode = 'tampilan';
  var resultIndex = 0;
  var flatDocs = Object.keys(DOCS);

  function buildTree() {
    if (!treeEl) return;
    var html = '';
    TREE.forEach(function (g, gi) {
      html += '<div class="tree__group">';
      html += '<button class="tree__row" type="button" aria-expanded="true" data-group="' + gi + '">';
      html += '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7a1 1 0 0 1 1-1h5l2 2h8a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/></svg>';
      html += g.name + '<span class="count">' + g.kids.length + '</span></button>';
      html += '<div class="tree__kids" data-kids="' + gi + '">';
      g.kids.forEach(function (k) {
        var path = g.name + ' / ' + k;
        html += '<button class="tree__kid" type="button" data-path="' + path + '" aria-current="' + (path === activeDoc ? 'true' : 'false') + '">';
        html += '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z"/><path d="M14 3v4h4"/></svg>';
        html += k.split(' / ').pop() + '</button>';
      });
      html += '</div></div>';
    });
    treeEl.innerHTML = html;

    $$('.tree__row', treeEl).forEach(function (b) {
      b.addEventListener('click', function () {
        var gi = b.getAttribute('data-group');
        var kids = $('[data-kids="' + gi + '"]', treeEl);
        var open = b.getAttribute('aria-expanded') === 'true';
        b.setAttribute('aria-expanded', String(!open));
        kids.style.display = open ? 'none' : 'block';
      });
    });
    $$('.tree__kid', treeEl).forEach(function (b) {
      b.addEventListener('click', function () {
        activeDoc = b.getAttribute('data-path');
        $$('.tree__kid', treeEl).forEach(function (x) {
          x.setAttribute('aria-current', x === b ? 'true' : 'false');
        });
        renderDoc();
      });
    });
  }

  function matches(doc, q) {
    if (!q) return true;
    var hay = (doc.title + ' ' + doc.crumbs.join(' ') + ' ' + doc.body.map(function (p) {
      return Array.isArray(p[1]) ? p[1].join(' ') : p[1];
    }).join(' ')).toLowerCase();
    return hay.indexOf(q.toLowerCase()) > -1;
  }

  function renderResults() {
    if (!resultsEl) return;
    var q = searchEl.value.trim();
    var hits = flatDocs.filter(function (k) { return matches(DOCS[k], q); });
    resultIndex = -1;
    if (countEl) countEl.textContent = hits.length + ' hasil';
    resultsEl.innerHTML = hits.map(function (k, i) {
      var d = DOCS[k];
      return '<button class="result" type="button" role="option" data-doc="' + k + '" aria-selected="false">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z"/><path d="M14 3v4h4"/></svg>' +
        '<span><span class="result__title">' + d.title + '</span><span class="result__path">' + d.crumbs.slice(0, 2).join(' / ') + '</span></span>' +
        '<span class="result__kind">' + d.badge + '</span></button>';
    }).join('') || '<p class="libcount" style="padding:16px 12px">Tidak ada dokumen yang cocok.</p>';
    $$('.result', resultsEl).forEach(function (b, i) {
      b.addEventListener('click', function () {
        resultIndex = i;
        activeDoc = b.getAttribute('data-doc');
        $$('.result', resultsEl).forEach(function (x) { x.setAttribute('aria-selected', x === b ? 'true' : 'false'); });
        $$('.tree__kid', treeEl).forEach(function (x) {
          x.setAttribute('aria-current', x.getAttribute('data-path') === activeDoc ? 'true' : 'false');
        });
        renderDoc();
      });
    });
  }

  function renderDoc() {
    if (!docEl) return;
    var d = DOCS[activeDoc];
    if (!d) return;
    var body = d.body.map(function (p) {
      if (p[0] === 'p') return '<p>' + p[1] + '</p>';
      if (p[0] === 'h4') return '<h4>' + p[1] + '</h4>';
      if (p[0] === 'ol') return '<ol>' + p[1].map(function (li) { return '<li>' + li + '</li>'; }).join('') + '</ol>';
      if (p[0] === 'pre') return '<pre>' + p[1] + '</pre>';
      return '';
    }).join('');

    if (mode === 'sumber') {
      var src = '---\ntitle: ' + d.title + '\npath: ' + d.crumbs.join('/').toLowerCase() + '\n' + d.foot.join('\n') + '\n---\n\n# ' + d.title + '\n\n';
      src += d.body.map(function (p) {
        if (p[0] === 'p') return p[1] + '\n';
        if (p[0] === 'h4') return '## ' + p[1] + '\n';
        if (p[0] === 'ol') return p[1].map(function (li, i) { return (i + 1) + '. ' + li; }).join('\n') + '\n';
        if (p[0] === 'pre') return '```\n' + p[1] + '\n```\n';
        return '';
      }).join('\n');
      body = '<pre>' + src.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</pre>';
    }

    docEl.innerHTML =
      '<div class="doc__crumbs">' + d.crumbs.map(function (c) { return c; }).join('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m9 6 6 6-6 6"/></svg>') + '</div>' +
      '<div class="doc__top"><h3 class="doc__title">' + d.title + '</h3>' +
      '<div class="doc__toggle" role="group" aria-label="Mode tampilan dokumen">' +
      '<button type="button" data-mode="tampilan" aria-pressed="' + (mode === 'tampilan') + '">Tampilan</button>' +
      '<button type="button" data-mode="sumber" aria-pressed="' + (mode === 'sumber') + '">Sumber</button>' +
      '</div></div>' +
      '<div class="doc__body">' + body + '</div>' +
      '<div class="doc__foot"><span class="doc__badge">' + d.badge + '</span>' + d.foot.map(function (f) { return '<span>' + f + '</span>'; }).join('') + '</div>';

    $$('[data-mode]', docEl).forEach(function (b) {
      b.addEventListener('click', function () {
        mode = b.getAttribute('data-mode');
        if (modeEl) modeEl.textContent = mode === 'tampilan' ? 'Tampilan' : 'Sumber';
        renderDoc();
      });
    });
  }

  if (searchEl) {
    searchEl.addEventListener('input', function () { resultIndex = 0; renderResults(); });
    searchEl.addEventListener('keydown', function (e) {
      var opts = $$('.result', resultsEl);
      if (!opts.length) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (resultIndex < 0) resultIndex = e.key === 'ArrowDown' ? 0 : opts.length - 1;
        else resultIndex = (resultIndex + (e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length;
        opts.forEach(function (o, i) { o.setAttribute('aria-selected', String(i === resultIndex)); });
        var col = opts[resultIndex].closest('.libcol');
        if (col) {
          var top = opts[resultIndex].offsetTop;
          var h = opts[resultIndex].offsetHeight;
          if (top < col.scrollTop) col.scrollTop = top - 8;
          else if (top + h > col.scrollTop + col.clientHeight) col.scrollTop = top + h - col.clientHeight + 8;
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        var pick = opts[resultIndex < 0 ? 0 : resultIndex];
        if (pick) pick.click();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    var tag = (e.target.tagName || '').toLowerCase();
    var typing = tag === 'input' || tag === 'textarea' || tag === 'select';
    if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
      var lib = $('#library');
      if (!lib) return;
      var r = lib.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        e.preventDefault();
        if (searchEl) { searchEl.focus(); searchEl.select(); }
      }
    }
    if (e.key === '?' && !typing) {
      e.preventDefault();
      var p = $('#prinsip');
      if (p) window.scrollTo({ top: p.offsetTop - 56 });
    }
  });

  buildTree();
  if (searchEl) { searchEl.value = 'dokumen'; }
  renderResults();
  renderDoc();

  /* ── Perizinan ──────────────────────────────────────────────────── */
  var permitType = 'cuti';
  var typeBtns = $$('[data-permit-type]');
  var typeLabel = $('#permit-type-label');
  var logBody = $('#permit-log');
  var logCount = $('#permit-log-count');
  var pendingEl = $('#quota-pending');
  var pending = 0;
  var permitCount = 3;

  function setPermitType(t) {
    permitType = t;
    typeBtns.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-permit-type') === t));
    });
    var label = t === 'cuti' ? 'Cuti' : t === 'sakit' ? 'Izin sakit' : 'Lembur';
    if (typeLabel) typeLabel.textContent = label;
  }
  typeBtns.forEach(function (b) {
    b.addEventListener('click', function () { setPermitType(b.getAttribute('data-permit-type')); });
  });

  function stamp() {
    var d = new Date();
    var p = function (n, l) { return String(n).padStart(l || 2, '0'); };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' +
      p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds()) + '.' + p(d.getMilliseconds(), 3);
  }
  function shortDate(v) {
    if (!v) return '--';
    var parts = v.split('-');
    return parts[2] + '-' + parts[1];
  }

  var permitForm = $('#permit-form');
  if (permitForm) {
    permitForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var start = $('#permit-start');
      var end = $('#permit-end');
      var note = $('#permit-note');
      var hint = $('#permit-hint');
      if (!start.value || !end.value) {
        if (hint) hint.textContent = 'Isi tanggal mulai dan tanggal selesai.';
        (start.value ? end : start).focus();
        return;
      }
      if (end.value < start.value) {
        if (hint) hint.textContent = 'Tanggal selesai tidak boleh sebelum tanggal mulai.';
        end.focus();
        return;
      }
      var label = permitType === 'cuti' ? 'Cuti' : permitType === 'sakit' ? 'Izin sakit' : 'Lembur';
      var period = permitType === 'lembur'
        ? shortDate(start.value) + ' · ' + (note.value.trim() ? 'sesuai keterangan' : 'tanpa keterangan')
        : shortDate(start.value) + ' → ' + shortDate(end.value);

      var tr = document.createElement('tr');
      tr.innerHTML = '<td class="stamp">' + stamp() + '</td><td>' + label + '</td><td>' + period + '</td>' +
        '<td class="r"><span class="chip chip--pending"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/></svg>Diajukan</span></td>';
      logBody.insertBefore(tr, logBody.firstChild);
      permitCount += 1;
      if (logCount) logCount.textContent = permitCount + ' baris';
      pending += 1;
      if (pendingEl) pendingEl.textContent = String(pending);
      if (hint) hint.innerHTML = 'Tercatat ' + stamp() + ' WIB · <kbd>Ctrl</kbd> <kbd>Enter</kbd> untuk kirim lagi';
      var lp = tr.closest('.logpanel');
      if (lp) lp.scrollTop = 0;
    });

    permitForm.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        permitForm.reset();
        $('#permit-start').value = '';
        $('#permit-end').value = '';
        $('#permit-note').value = '';
        setPermitType('cuti');
        var hint = $('#permit-hint');
        if (hint) hint.innerHTML = '<kbd>Ctrl</kbd> <kbd>Enter</kbd> untuk kirim · <kbd>Esc</kbd> untuk kosongkan';
        $('#permit-start').focus();
        return;
      }
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        permitForm.requestSubmit();
        return;
      }
      if ((e.key === '1' || e.key === '2' || e.key === '3') && !e.ctrlKey && !e.metaKey) {
        var tag = (e.target.tagName || '').toLowerCase();
        if (tag === 'input' || tag === 'textarea') return;
        e.preventDefault();
        setPermitType(e.key === '1' ? 'cuti' : e.key === '2' ? 'sakit' : 'lembur');
      }
    });
  }

  /* ── Absensi ────────────────────────────────────────────────────── */
  var clockBtn = $('#clock-btn');
  var clockLabel = $('#clock-label');
  var clockSub = $('#clock-sub');
  var clockState = $('#clock-state');
  var clockStatus = $('#clock-status');
  var clockLog = $('#clock-log');
  var inOffice = false;
  var lastIn = null;

  function pad(n, l) { return String(n).padStart(l || 2, '0'); }
  function fullStamp() {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' +
      pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()) + '.' +
      pad(d.getMilliseconds(), 3) + ' WIB';
  }
  function hm() {
    var d = new Date();
    return pad(d.getHours()) + ':' + pad(d.getMinutes());
  }

  function toggleClock() {
    if (!clockBtn) return;
    var now = new Date();
    var late = now.getHours() > 9 || (now.getHours() === 9 && now.getMinutes() > 0);
    if (!inOffice) {
      inOffice = true;
      lastIn = now;
      clockLabel.textContent = 'Keluar';
      clockSub.textContent = 'Tekan Space untuk catat';
      clockState.textContent = hm();
      clockStatus.textContent = 'Masuk tercatat ' + fullStamp() + (late ? ' · terlambat' : ' · tepat waktu');
      var tr = document.createElement('tr');
      tr.innerHTML = '<td class="stamp">' + fullStamp() + '</td><td>Masuk</td><td class="r">' +
        (late ? '<span class="chip chip--late">Terlambat</span>' : '<span class="chip chip--approved"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m5 13 4 4L19 7"/></svg>Tepat waktu</span>') + '</td>';
      if (clockLog) clockLog.insertBefore(tr, clockLog.firstChild);
    } else {
      inOffice = false;
      clockLabel.textContent = 'Masuk';
      clockSub.textContent = 'Tekan Space untuk catat';
      clockState.textContent = hm();
      var mins = lastIn ? Math.max(1, Math.round((now - lastIn) / 60000)) : 0;
      clockStatus.textContent = 'Keluar tercatat ' + fullStamp() + ' · durasi sesi ' + Math.floor(mins / 60) + 'j ' + (mins % 60) + 'm';
      var tr2 = document.createElement('tr');
      tr2.innerHTML = '<td class="stamp">' + fullStamp() + '</td><td>Keluar</td><td class="r"><span class="chip chip--leave">Sesi ' + Math.floor(mins / 60) + 'j ' + (mins % 60) + 'm</span></td>';
      if (clockLog) clockLog.insertBefore(tr2, clockLog.firstChild);
    }
  }
  if (clockBtn) {
    clockBtn.addEventListener('click', toggleClock);
    clockState.textContent = hm();
  }
  document.addEventListener('keydown', function (e) {
    if (e.code !== 'Space' && e.key !== ' ') return;
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || tag === 'button' || tag === 'summary') return;
    var att = $('#absensi');
    if (!att) return;
    var r = att.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.6 && r.bottom > 120) {
      e.preventDefault();
      toggleClock();
    }
  });

  /* ── Gaji exports ───────────────────────────────────────────────── */
  var btnCsv = $('#btn-csv');
  var btnPdf = $('#btn-pdf');
  var boxCsv = $('#export-csv');
  var boxPdf = $('#export-pdf');
  function toggleExport(btn, box, otherBtn, otherBox) {
    if (!btn || !box) return;
    var open = box.hidden;
    box.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    if (open && otherBox && otherBtn) {
      otherBox.hidden = true;
      otherBtn.setAttribute('aria-expanded', 'false');
    }
  }
  if (btnCsv) btnCsv.addEventListener('click', function () { toggleExport(btnCsv, boxCsv, btnPdf, boxPdf); });
  if (btnPdf) btnPdf.addEventListener('click', function () { toggleExport(btnPdf, boxPdf, btnCsv, boxCsv); });

  /* ── Exam tabs ──────────────────────────────────────────────────── */
  var tabs = $$('.tabs [role="tab"]');
  var tabData = {
    'tab-rekrutmen': { label: 'rekrutmen', weights: [40, 30, 20, 10], scores: [3, 3, 4, 4], total: '82,5' },
    'tab-kinerja': { label: 'evaluasi kinerja', weights: [30, 40, 20, 10], scores: [3, 4, 3, 4], total: '87,5' },
    'tab-kompetensi': { label: 'kompetensi', weights: [25, 35, 30, 10], scores: [4, 4, 3, 4], total: '92,5' }
  };
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.setAttribute('aria-selected', String(x === t)); });
      var d = tabData[t.id];
      var panel = $('#panel-exam');
      if (panel) panel.setAttribute('aria-labelledby', t.id);
      if (!d) return;
      $$('.rubric__row').forEach(function (row, i) {
        var w = row.querySelector('.rubric__w');
        var bar = row.querySelector('.bar i');
        if (w) w.textContent = 'bobot ' + d.weights[i] + ' · skor ' + d.scores[i] + '/4';
        if (bar) bar.style.width = (d.scores[i] / 4 * 100) + '%';
        if (bar && bar.parentNode) bar.parentNode.setAttribute('aria-label', 'Skor ' + d.scores[i] + ' dari 4');
      });
      var sn = $('.score__n');
      if (sn) sn.innerHTML = d.total + '<span style="font-size:16px;letter-spacing:0">/100</span>';
      var dek = $('.case__dek');
      if (dek) dek.textContent = 'studi kasus · ' + d.label + ' · bobot ' + d.weights.join('/');
    });
  });

  /* ── FAQ single-open accordion ──────────────────────────────────── */
  var faqs = $$('.faq__item');
  faqs.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      faqs.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });
})();
