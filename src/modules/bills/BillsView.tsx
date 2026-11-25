import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  CreditCard,
  Droplets,
  ExternalLink,
  Home,
  Info,
  Receipt,
  Search,
  Smartphone,
  Zap,
} from 'lucide-react';
import { ICON_CIRCLE_THEMES, UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';
import { Payment } from '../../types';
import { formatDateTime } from '../../utils/format';
import { E_NAGARPALIKA_PORTAL_URL } from '../../constants';

// REAL INTEGRATION NOTE: Property and water tax payments redirect directly to MP e-Nagarpalika official portal.

export const BillsView: React.FC = () => {
  const { taxAccounts, payments, language, t } = useApp();
  const [taxType, setTaxType] = useState<'property' | 'water'>('property');
  const [propertyId, setPropertyId] = useState('MHR-P-1001');
  const [fetchedId, setFetchedId] = useState<string | null>(null);
  const [payMethod, setPayMethod] = useState<'UPI' | 'Card'>('UPI');
  const [upiId, setUpiId] = useState('citizen@upi');
  const [cardLast4, setCardLast4] = useState('4242');
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState<Payment | null>(null);
  const [showElecInfo, setShowElecInfo] = useState(false);

  useEffect(() => {
    window.location.href = E_NAGARPALIKA_PORTAL_URL;
  }, []);

  const activeAccount = fetchedId
    ? taxAccounts.find((a) => a.propertyId.toUpperCase() === fetchedId.toUpperCase()) || null
    : null;

  const dueAmount = activeAccount
    ? taxType === 'property'
      ? activeAccount.propertyTaxDue
      : activeAccount.waterTaxDue
    : 0;

  const handleFetch = (e: React.FormEvent) => {
    e.preventDefault();
    setReceipt(null);
    const cleaned = propertyId.trim().toUpperCase();
    if (!cleaned) {
      setError(t.errPropertyIdRequired);
      setFetchedId(null);
      return;
    }
    const found = taxAccounts.find((a) => a.propertyId.toUpperCase() === cleaned);
    if (!found) {
      setError(t.errPropertyIdNotFound);
      setFetchedId(null);
      return;
    }
    setError('');
    setFetchedId(found.propertyId);
  };

  const handlePay = () => {
    window.location.href = E_NAGARPALIKA_PORTAL_URL;
  };

  return (
    <div className="p-3.5 space-y-3.5">
      {/* Official MP e-Nagarpalika Direct Redirect Banner */}
      <div className="rounded-[16px] p-4 bg-gradient-to-r from-[#1976D2] to-[#0D47A1] text-white shadow-md space-y-3">
        <div className="flex items-center gap-2">
          <ExternalLink className="w-5 h-5 shrink-0 text-yellow-300" />
          <h2 className="text-sm font-bold">
            {language === 'hi' ? 'म.प्र. ई-नगरपालिका आधिकारिक पोर्टल' : 'MP e-Nagarpalika Official Portal'}
          </h2>
        </div>
        <p className="text-xs text-blue-100 leading-relaxed">
          {language === 'hi'
            ? 'मैहर नगर पालिका के संपत्ति कर एवं जल कर का ऑनलाइन भुगतान मध्य प्रदेश शासन के आधिकारिक ई-नगरपालिका पोर्टल पर होता है।'
            : 'Online payment of property tax and water tax for Maihar Nagar Palika is processed on the Government of MP e-Nagarpalika portal.'}
        </p>
        <button
          type="button"
          onClick={() => {
            window.location.href = E_NAGARPALIKA_PORTAL_URL;
          }}
          className="w-full py-2.5 px-4 rounded-[10px] bg-white text-[#0D47A1] hover:bg-blue-50 text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.98]"
        >
          <span>{language === 'hi' ? 'ई-नगरपालिका पर कर भुगतान करें' : 'Pay Tax on e-Nagarpalika Portal'}</span>
          <ExternalLink className="w-4 h-4 shrink-0" />
        </button>
      </div>
      {/* Tax Type Switcher */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => {
            setTaxType('property');
            setReceipt(null);
            setError('');
          }}
          className={`min-h-[54px] px-3 rounded-[12px] border text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-[var(--mnp-shadow-card)] ${
            taxType === 'property'
              ? 'bg-[var(--mnp-primary)] text-white border-[var(--mnp-primary)]'
              : 'bg-[var(--mnp-surface)] text-[var(--mnp-text)] border-[var(--mnp-border)]'
          }`}
        >
          <Home className="w-4 h-4 shrink-0" />
          <span>{t.propertyTax}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setTaxType('water');
            setReceipt(null);
            setError('');
          }}
          className={`min-h-[54px] px-3 rounded-[12px] border text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-[var(--mnp-shadow-card)] ${
            taxType === 'water'
              ? 'bg-[var(--mnp-primary)] text-white border-[var(--mnp-primary)]'
              : 'bg-[var(--mnp-surface)] text-[var(--mnp-text)] border-[var(--mnp-border)]'
          }`}
        >
          <Droplets className="w-4 h-4 shrink-0" />
          <span>{t.waterTax}</span>
        </button>
      </div>

      {/* Receipt View */}
      {receipt ? (
        <div className="rounded-[12px] border border-[#A7DFBA] dark:border-[#1E5C38] bg-[var(--mnp-surface)] shadow-[var(--mnp-shadow-card)] p-4 space-y-3">
          <div className="flex items-center gap-2 text-[var(--mnp-success)]">
            <CheckCircle2 className="w-6 h-6 shrink-0" />
            <h2 className="text-base font-bold">{t.paymentReceiptTitle}</h2>
          </div>

          <div className="divide-y divide-[var(--mnp-border)] text-xs">
            <div className="py-2 flex justify-between gap-2">
              <span className="text-[var(--mnp-text-muted)]">{t.receiptNoLabel}</span>
              <span className="font-bold text-[var(--mnp-text)] tabular-nums">
                {receipt.receiptNo}
              </span>
            </div>
            <div className="py-2 flex justify-between gap-2">
              <span className="text-[var(--mnp-text-muted)]">Property ID</span>
              <span className="font-bold text-[var(--mnp-text)] tabular-nums">
                {receipt.propertyId}
              </span>
            </div>
            <div className="py-2 flex justify-between gap-2">
              <span className="text-[var(--mnp-text-muted)]">{t.ownerName}</span>
              <span className="font-bold text-[var(--mnp-text)]">{receipt.payerName}</span>
            </div>
            <div className="py-2 flex justify-between gap-2">
              <span className="text-[var(--mnp-text-muted)]">{t.dueAmount}</span>
              <span className="font-bold text-[var(--mnp-success)] text-sm tabular-nums">
                ₹{receipt.amount.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="py-2 flex justify-between gap-2">
              <span className="text-[var(--mnp-text-muted)]">{t.paymentModeLabel}</span>
              <span className="font-bold text-[var(--mnp-text)]">{receipt.method}</span>
            </div>
            <div className="py-2 flex justify-between gap-2">
              <span className="text-[var(--mnp-text-muted)]">{t.paidOnLabel}</span>
              <span className="font-semibold text-[var(--mnp-text)] tabular-nums">
                {formatDateTime(receipt.paidAt, language)}
              </span>
            </div>
          </div>

          <p className="text-[11px] font-medium text-[var(--mnp-warning)] bg-[var(--mnp-warning-bg)] p-2.5 rounded-[8px]">
            {t.demoPaymentDisclaimer}
          </p>

          <button
            type="button"
            onClick={() => setReceipt(null)}
            className={`${UI.btnPrimary} w-full`}
          >
            {t.payAnotherBill}
          </button>
        </div>
      ) : (
        <>
          {/* Property ID Lookup Form */}
          <form onSubmit={handleFetch} className={`${UI.card} p-4 space-y-3`}>
            <label
              htmlFor="bill-prop-id"
              className="block text-xs font-bold text-[var(--mnp-text)]"
            >
              {t.enterPropertyId}
            </label>
            <div className="flex gap-2">
              <input
                id="bill-prop-id"
                type="text"
                value={propertyId}
                onChange={(e) => {
                  setPropertyId(e.target.value);
                  setError('');
                }}
                placeholder={t.propertyIdPlaceholder}
                className={`${UI.input} flex-1 uppercase`}
              />
              <button
                type="submit"
                className={`${UI.btnPrimary} text-xs flex items-center gap-1.5 whitespace-nowrap shrink-0`}
              >
                <Search className="w-4 h-4" />
                <span>{t.fetchDuesBtn}</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {taxAccounts.slice(0, 3).map((acc) => (
                <button
                  key={acc.propertyId}
                  type="button"
                  onClick={() => {
                    setPropertyId(acc.propertyId);
                    setFetchedId(acc.propertyId);
                    setError('');
                  }}
                  className="px-3 py-1 rounded-full border border-[var(--mnp-border-strong)] bg-[var(--mnp-surface-muted)] text-[11px] font-bold text-[var(--mnp-primary)] tabular-nums"
                >
                  {acc.propertyId}
                </button>
              ))}
            </div>

            {error && (
              <p className={UI.errorText} role="alert">
                {error}
              </p>
            )}
          </form>

          {/* Account Dues & Simulated Payment */}
          {activeAccount && (
            <div className={`${UI.card} p-4 space-y-4`}>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[var(--mnp-text-muted)]">{t.ownerName}</span>
                  <span className="font-bold text-[var(--mnp-text)]">
                    {language === 'hi' ? activeAccount.ownerNameHi : activeAccount.ownerNameEn}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[var(--mnp-text-muted)] shrink-0">
                    {t.propertyAddress}
                  </span>
                  <span className="text-[var(--mnp-text-secondary)] text-right">
                    {language === 'hi' ? activeAccount.addressHi : activeAccount.addressEn}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2.5 border-t border-[var(--mnp-border)]">
                  <span className="text-sm font-bold text-[var(--mnp-text)]">
                    {t.dueAmount} ({taxType === 'property' ? t.propertyTax : t.waterTax})
                  </span>
                  <span className="text-lg font-bold text-[var(--mnp-primary)] tabular-nums">
                    ₹{dueAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {dueAmount <= 0 ? (
                <div className="rounded-[10px] bg-[var(--mnp-success-bg)] border border-[#A7DFBA] dark:border-[#1E5C38] p-3 text-xs font-bold text-[var(--mnp-success)] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{t.alreadyPaidMsg}</span>
                </div>
              ) : (
                <div className="space-y-3 pt-2 border-t border-[var(--mnp-border)]">
                  <p className="text-xs font-bold text-[var(--mnp-text)]">
                    {t.choosePaymentMethod}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPayMethod('UPI');
                        setError('');
                      }}
                      className={`min-h-[48px] px-3 rounded-[10px] border text-xs font-bold flex items-center justify-center gap-1.5 ${
                        payMethod === 'UPI'
                          ? 'border-[var(--mnp-primary)] bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] ring-1 ring-[var(--mnp-primary)]'
                          : 'border-[var(--mnp-border-strong)] text-[var(--mnp-text-secondary)]'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>{t.payViaUpi}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPayMethod('Card');
                        setError('');
                      }}
                      className={`min-h-[48px] px-3 rounded-[10px] border text-xs font-bold flex items-center justify-center gap-1.5 ${
                        payMethod === 'Card'
                          ? 'border-[var(--mnp-primary)] bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] ring-1 ring-[var(--mnp-primary)]'
                          : 'border-[var(--mnp-border-strong)] text-[var(--mnp-text-secondary)]'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>{t.payViaCard}</span>
                    </button>
                  </div>

                  {payMethod === 'UPI' ? (
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => {
                        setUpiId(e.target.value);
                        setError('');
                      }}
                      placeholder={t.upiIdPlaceholder}
                      className={UI.input}
                    />
                  ) : (
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      value={cardLast4}
                      onChange={(e) => {
                        setCardLast4(e.target.value.replace(/\D/g, ''));
                        setError('');
                      }}
                      placeholder={t.cardLast4Placeholder}
                      className={`${UI.input} tabular-nums`}
                    />
                  )}

                  <button
                    type="button"
                    onClick={handlePay}
                    className={`${UI.btnSuccess} w-full tabular-nums flex items-center justify-center gap-2`}
                  >
                    <span>
                      {language === 'hi'
                        ? 'ई-नगरपालिका पोर्टल पर भुगतान करें'
                        : 'Pay on MP e-Nagarpalika Portal'}
                      {' · ₹' + dueAmount.toLocaleString('en-IN')}
                    </span>
                    <ExternalLink className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Electricity Info-Only Tile */}
      <div className={`${UI.card} overflow-hidden`}>
        <button
          type="button"
          onClick={() => setShowElecInfo((v) => !v)}
          className="w-full min-h-[60px] p-3.5 flex items-center justify-between gap-3 text-left hover:bg-[var(--mnp-surface-muted)] transition-colors"
        >
          <div className="flex items-center gap-3">
            <span
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${ICON_CIRCLE_THEMES.amber}`}
            >
              <Zap className="w-5 h-5" />
            </span>
            <span className="text-sm font-bold text-[var(--mnp-text)]">
              {t.electricityInfoTile}
            </span>
          </div>
          <Info className="w-4 h-4 text-[var(--mnp-text-muted)] shrink-0" />
        </button>
        {showElecInfo && (
          <div className="px-4 pb-4 pt-2 border-t border-[var(--mnp-border)] bg-[var(--mnp-surface-muted)] text-xs text-[var(--mnp-text-secondary)] space-y-1.5 leading-relaxed">
            <p>{t.electricityInfoDesc}</p>
            <p className="font-bold text-[var(--mnp-primary)]">{t.electricityPortalNote}</p>
          </div>
        )}
      </div>

      {/* Recent Payments History */}
      <section className="space-y-2">
        <h3 className={`${UI.sectionTitle} flex items-center gap-1.5`}>
          <Receipt className="w-4 h-4 text-[var(--mnp-primary)]" />
          <span>{t.recentPaymentsTitle}</span>
        </h3>
        {payments.length === 0 ? (
          <p className={UI.mutedText}>{t.noPaymentsYet}</p>
        ) : (
          <div className={`${UI.card} divide-y divide-[var(--mnp-border)] overflow-hidden`}>
            {payments.slice(0, 5).map((pay) => (
              <div key={pay.id} className="p-3.5 flex items-center justify-between gap-2 text-xs">
                <div className="min-w-0">
                  <div className="font-bold text-[var(--mnp-text)] tabular-nums">
                    {pay.receiptNo}
                  </div>
                  <div className="text-[var(--mnp-text-muted)]">
                    {pay.propertyId} · {pay.taxType === 'property' ? t.propertyTax : t.waterTax} ·{' '}
                    {pay.method}
                  </div>
                </div>
                <div className="text-right shrink-0 tabular-nums">
                  <div className="font-bold text-[var(--mnp-success)]">
                    ₹{pay.amount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-[var(--mnp-text-muted)]">
                    {formatDateTime(pay.paidAt, language)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
