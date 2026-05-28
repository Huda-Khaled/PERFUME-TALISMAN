import PolicyLayout, { PolicySection, PolicyList } from "./PolicyLayout";
import { WHATSAPP_PHONE } from "../../constants/contact";
import { SITE_DOMAIN, SITE_NAME } from "../../constants/brand";

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="سياسة الخصوصية" updatedAt="15 مايو 2026">
      <p>
        في {SITE_NAME} ({SITE_DOMAIN}) نحترم خصوصيتك ونلتزم بحماية
        بياناتك الشخصية.
      </p>

      <PolicySection title="المعلومات التي نجمعها">
        <PolicyList
          items={[
            "معلومات شخصية: الاسم، رقم الهاتف، عنوان البريد الإلكتروني، عنوان التوصيل.",
            "معلومات الطلب: تفاصيل المنتجات، طريقة الدفع.",
            "معلومات تلقائية: عنوان IP، نوع المتصفح، صفحات الزيارة (باستخدام ملفات تعريف الارتباط).",
          ]}
        />
      </PolicySection>

      <PolicySection title="كيف نستخدم معلوماتك">
        <PolicyList
          items={[
            "معالجة طلباتك وتوصيل المنتجات.",
            "التواصل معك بخصوص الطلبات والعروض.",
            "تحسين تجربة الموقع.",
            "الامتثال للمتطلبات القانونية.",
          ]}
        />
      </PolicySection>

      <PolicySection title="مشاركة المعلومات">
        <p>لا نبيع بياناتك لأطراف ثالثة. قد نشاركها مع:</p>
        <PolicyList
          items={[
            "شركات الشحن (لإكمال التوصيل).",
            "مزودي الدفع الإلكتروني.",
            "الجهات الحكومية عند الطلب القانوني.",
          ]}
        />
      </PolicySection>

      <PolicySection title="حماية البيانات">
        <p>نستخدم إجراءات أمنية تقنية وإدارية لحماية بياناتك.</p>
      </PolicySection>

      <PolicySection title="حقوقك">
        <PolicyList
          items={[
            "الوصول إلى بياناتك.",
            "تصحيحها أو حذفها.",
            "سحب الموافقة على معالجة بياناتك.",
          ]}
        />
      </PolicySection>

      <PolicySection title="لأي استفسار">
        <p>
          تواصل معنا على الواتساب:{" "}
          <a
            href={`https://wa.me/${WHATSAPP_PHONE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand font-bold hover:underline"
          >
            +{WHATSAPP_PHONE}
          </a>
        </p>
      </PolicySection>
    </PolicyLayout>
  );
}
