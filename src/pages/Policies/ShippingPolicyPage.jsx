import PolicyLayout, { PolicySection, PolicyList } from "./PolicyLayout";
import {
  FREE_SHIPPING_THRESHOLD_KWD,
  SHIPPING_FEE_KWD,
} from "../../constants/shipping";

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout title="سياسة الشحن والتوصيل">
      <PolicySection>
        <PolicyList
          items={[
            "مناطق التوصيل: حاليًا داخل دولة الكويت فقط.",
            "وقت التوصيل: 1–3 أيام عمل من تأكيد الطلب (حسب المنطقة).",
          ]}
        />
      </PolicySection>

      <PolicySection title="تكلفة الشحن">
        <PolicyList items={[`${SHIPPING_FEE_KWD} دينار كويتي رسوم توصيل`]} />
      </PolicySection>

      <PolicySection>
        <PolicyList
          items={[
            "عملية الشحن: يتم تجهيز الطلب خلال 24 ساعة، ثم يُسلم عبر شركة شحن موثوقة.",
            "التتبع: سنرسل لك رقم التتبع عبر الواتساب أو الإيميل.",
          ]}
        />
      </PolicySection>

      <PolicySection>
        <p className="text-gray-600 text-sm border-r-4 border-brand-light pr-4">
          نبذل قصارى جهدنا لتوصيل الطلب في الوقت المحدد، لكن قد تحدث تأخيرات
          بسبب الظروف الخارجة عن إرادتنا.
        </p>
      </PolicySection>
    </PolicyLayout>
  );
}
