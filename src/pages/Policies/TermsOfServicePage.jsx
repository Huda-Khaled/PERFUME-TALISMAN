import PolicyLayout, { PolicySection, PolicyList } from "./PolicyLayout";
import { SITE_NAME } from "../../constants/brand";

export default function TermsOfServicePage() {
  return (
    <PolicyLayout title="شروط الاستخدام">
      <p>مرحبًا بك في {SITE_NAME}.</p>

      <PolicySection title="بالدخول إلى الموقع أو إجراء عملية شراء توافق على:">
        <PolicyList
          items={[
            "أنك فوق 18 سنة.",
            "أن المعلومات التي تقدمها صحيحة وحديثة.",
            "أنك لن تستخدم الموقع لأغراض غير قانونية.",
          ]}
        />
      </PolicySection>

      <PolicySection title="المنتجات">
        <PolicyList
          items={[
            "جميع العطور المعروضة أصلية من براندات عالمية.",
            "الأسعار والعروض قابلة للتغيير بدون إشعار مسبق.",
            "الصور للتوضيح وقد تختلف قليلاً عن المنتج الفعلي.",
          ]}
        />
      </PolicySection>

      <PolicySection title="الدفع والملكية">
        <PolicyList
          items={[
            "الملكية تنتقل إليك بعد استلام المنتج وتأكيد الدفع.",
            "نحتفظ بحق رفض أي طلب لأي سبب.",
          ]}
        />
      </PolicySection>

      <PolicySection title="المسؤولية">
        <PolicyList
          items={[
            "نحن غير مسؤولين عن أي تأخير ناتج عن قوة قاهرة.",
            "يُحظر نسخ محتوى الموقع أو استخدامه تجاريًا بدون إذن.",
          ]}
        />
      </PolicySection>

      <PolicySection title="التعديلات">
        <p>
          نحتفظ بحق تعديل هذه الشروط في أي وقت. استمرار استخدامك يعني موافقتك
          على التعديلات.
        </p>
      </PolicySection>

      <PolicySection title="القانون الحاكم">
        <p>تخضع هذه الشروط لقوانين دولة الكويت.</p>
      </PolicySection>
    </PolicyLayout>
  );
}
