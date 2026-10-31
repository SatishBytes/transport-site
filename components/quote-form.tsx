"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { getWhatsAppHref, siteConfig } from "@/lib/site-config";
import { bodyTypes } from "@/data/body-types";
import { vehicles } from "@/data/vehicles";
import { Button } from "./button";

const requiredFields = [
  "name",
  "phone",
  "pickupCity",
  "pickupPinCode",
  "deliveryCity",
  "deliveryPinCode",
  "goodsType",
  "approximateWeight",
  "pickupDate",
] as const;

const optionalFields = [
  "additionalDetails",
  "preferredVehicleSize",
  "preferredBodyType",
] as const;
const allTextFields = [...requiredFields, ...optionalFields] as const;
type QuoteField = (typeof allTextFields)[number];
type FieldErrors = Partial<Record<QuoteField, string>>;
type QuoteValues = Record<QuoteField, string>;

const fieldLimits: Record<QuoteField, number> = {
  name: 80,
  phone: 10,
  pickupCity: 100,
  pickupPinCode: 6,
  deliveryCity: 100,
  deliveryPinCode: 6,
  goodsType: 100,
  approximateWeight: 50,
  pickupDate: 10,
  additionalDetails: 1000,
  preferredVehicleSize: 16,
  preferredBodyType: 16,
};

const fieldLabels: Record<QuoteField, string> = {
  name: "Name",
  phone: "Phone number",
  pickupCity: "Pickup city",
  pickupPinCode: "Pickup PIN code",
  deliveryCity: "Delivery city",
  deliveryPinCode: "Delivery PIN code",
  goodsType: "Goods type",
  approximateWeight: "Approximate weight",
  pickupDate: "Preferred pickup date",
  additionalDetails: "Additional details",
  preferredVehicleSize: "Preferred vehicle size",
  preferredBodyType: "Body type",
};

function normalizePhone(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits.slice(0, 10);
}

function cleanField(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u001f\u007f-\u009f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getQuoteValues(formData: FormData): QuoteValues {
  return {
    name: cleanField(formData.get("name")),
    phone: cleanField(formData.get("phone")),
    pickupCity: cleanField(formData.get("pickupCity")),
    pickupPinCode: cleanField(formData.get("pickupPinCode")),
    deliveryCity: cleanField(formData.get("deliveryCity")),
    deliveryPinCode: cleanField(formData.get("deliveryPinCode")),
    goodsType: cleanField(formData.get("goodsType")),
    approximateWeight: cleanField(formData.get("approximateWeight")),
    pickupDate: cleanField(formData.get("pickupDate")),
    additionalDetails: cleanField(formData.get("additionalDetails")),
    preferredVehicleSize: cleanField(formData.get("preferredVehicleSize")),
    preferredBodyType: cleanField(formData.get("preferredBodyType")),
  };
}

function isValidCalendarDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12) return false;

  const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [
    31,
    isLeapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  return day >= 1 && day <= daysInMonth[month - 1];
}

function validateForm(values: QuoteValues): FieldErrors {
  const errors: FieldErrors = {};

  for (const field of requiredFields) {
    if (!values[field]) {
      errors[field] =
        field === "pickupPinCode"
          ? "Enter pickup PIN code"
          : field === "deliveryPinCode"
            ? "Enter delivery PIN code"
            : `${fieldLabels[field]} is required.`;
    }

    if (values[field].length > fieldLimits[field]) {
      errors[field] = `${fieldLabels[field]} must be ${fieldLimits[field]} characters or fewer.`;
    }
  }

  for (const field of ["name", "pickupCity", "deliveryCity"] as const) {
    const value = values[field];
    if (
      value &&
      !/^[\p{L}\p{M}][\p{L}\p{M} .,'’()-]*$/u.test(value)
    ) {
      errors[field] = `${fieldLabels[field]} may contain letters, spaces, and basic punctuation only.`;
    }
  }

  if (values.phone && !/^[6-9][0-9]{9}$/.test(values.phone)) {
    errors.phone = "Enter a valid 10-digit mobile number";
  }

  if (values.pickupPinCode && !/^[1-9][0-9]{5}$/.test(values.pickupPinCode)) {
    errors.pickupPinCode = "Enter a valid 6-digit pickup PIN code";
  }

  if (
    values.deliveryPinCode &&
    !/^[1-9][0-9]{5}$/.test(values.deliveryPinCode)
  ) {
    errors.deliveryPinCode = "Enter a valid 6-digit delivery PIN code";
  }

  if (
    values.goodsType &&
    !/^[\p{L}\p{M}\d][\p{L}\p{M}\d\s.,'’"&()/+_-]*$/u.test(values.goodsType)
  ) {
    errors.goodsType =
      "Goods type may contain letters, numbers, spaces, and basic punctuation only.";
  }

  if (
    values.approximateWeight &&
    !/^[\p{L}\p{M}\d][\p{L}\p{M}\d\s.,'’()/+-]*$/u.test(
      values.approximateWeight,
    )
  ) {
    errors.approximateWeight =
      "Enter a weight using letters, numbers, spaces, and basic punctuation only.";
  }

  if (values.pickupDate && !isValidCalendarDate(values.pickupDate)) {
    errors.pickupDate = "Enter a valid pickup date.";
  }

  if (
    values.preferredVehicleSize &&
    !vehicles.some(
      (vehicle) =>
        values.preferredVehicleSize === `${vehicle.sizeFeet} feet`,
    )
  ) {
    errors.preferredVehicleSize = "Choose a listed vehicle size.";
  }

  if (
    values.preferredBodyType &&
    !bodyTypes.some((bodyType) => bodyType.id === values.preferredBodyType)
  ) {
    errors.preferredBodyType = "Choose a listed body type.";
  }

  if (values.additionalDetails.length > fieldLimits.additionalDetails) {
    errors.additionalDetails = `Additional details must be ${fieldLimits.additionalDetails} characters or fewer.`;
  }

  if (
    values.additionalDetails &&
    /[^\p{L}\p{M}\d\s.,!?;:'"’“”()&/+_#@%=-]/u.test(
      values.additionalDetails,
    )
  ) {
    errors.additionalDetails =
      "Additional details contain unsupported characters.";
  }

  return errors;
}

function isRequiredField(field: QuoteField) {
  return requiredFields.some((requiredField) => requiredField === field);
}

function createWhatsAppMessage(values: QuoteValues) {
  return [
    `Transport quote enquiry for ${siteConfig.companyName}`,
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    `Pickup: ${values.pickupCity} - ${values.pickupPinCode}`,
    `Delivery: ${values.deliveryCity} - ${values.deliveryPinCode}`,
    `Goods type: ${values.goodsType}`,
    `Approximate weight: ${values.approximateWeight}`,
    `Preferred pickup date: ${values.pickupDate}`,
    `Preferred vehicle: ${values.preferredVehicleSize || "Not sure"}`,
    `Body type: ${bodyTypes.find((bodyType) => bodyType.id === values.preferredBodyType)?.label ?? "Not sure"}`,
    `Additional details: ${values.additionalDetails || "Not provided"}`,
  ].join("\n");
}

export function QuoteForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [feedback, setFeedback] = useState("");
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const cooldownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
    },
    [],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");

    const formData = new FormData(event.currentTarget);
    if (cleanField(formData.get("website"))) {
      setFeedback("This enquiry could not be processed.");
      return;
    }

    const values = getQuoteValues(formData);
    const nextErrors = validateForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFeedback("Please correct the highlighted fields and try again.");
      const firstInvalidField = allTextFields.find((field) => nextErrors[field]);
      if (firstInvalidField) {
        document.getElementById(firstInvalidField)?.focus();
      }
      return;
    }

    if (isCoolingDown) {
      setFeedback("Please wait a few seconds before preparing another enquiry.");
      return;
    }

    setIsCoolingDown(true);
    cooldownTimer.current = setTimeout(() => {
      setIsCoolingDown(false);
      cooldownTimer.current = null;
    }, 8000);

    const message = createWhatsAppMessage(values);
    const whatsappHref = getWhatsAppHref(message);

    if (!whatsappHref) {
      setFeedback(
        "WhatsApp is not configured yet. Your enquiry has not been sent or saved. Your details remain in this form; please contact the business after its WhatsApp number is added to the site configuration.",
      );
      return;
    }

    window.open(whatsappHref, "_blank", "noopener,noreferrer");
    setFeedback(
      `Your enquiry message was opened in WhatsApp. Review and send it there to contact ${siteConfig.companyName}.`,
    );
  }

  function getFieldProps(name: QuoteField) {
    const error = errors[name];
    return {
      id: name,
      name,
      required: isRequiredField(name),
      maxLength: fieldLimits[name],
      "aria-invalid": Boolean(error),
      "aria-describedby": error ? `${name}-error` : undefined,
      className:
        "quote-field mt-2 min-h-12 w-full rounded-xl px-4 outline-none",
    } as const;
  }

  function getPinCodeProps(name: "pickupPinCode" | "deliveryPinCode") {
    const error = errors[name];
    return {
      ...getFieldProps(name),
      type: "text",
      inputMode: "numeric" as const,
      autoComplete: name === "pickupPinCode" ? "postal-code" : "off",
      "aria-describedby": error ? `${name}-help ${name}-error` : `${name}-help`,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        event.currentTarget.value = event.currentTarget.value
          .replace(/\D/g, "")
          .slice(0, fieldLimits[name]);
      },
    };
  }

  function renderError(name: QuoteField) {
    return errors[name] ? (
      <p
        id={`${name}-error`}
        className="motion-message mt-1 text-sm font-medium text-red-700 dark:text-red-400"
      >
        {errors[name]}
      </p>
    ) : null;
  }

  return (
    <form
      className="quote-form-shell surface-card space-y-6 p-5 sm:p-8"
      onSubmit={handleSubmit}
      noValidate
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Fields marked <span className="font-bold text-red-700 dark:text-red-400">*</span> are
        required. This form opens a WhatsApp message; it does not save or send
        your information to a {siteConfig.companyName} server.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-semibold text-slate-900 dark:text-slate-100">
            Name <span className="text-red-700 dark:text-red-400">*</span>
          </label>
          <input autoComplete="name" {...getFieldProps("name")} />
          {renderError("name")}
        </div>
        <div>
          <label htmlFor="phone" className="font-semibold text-slate-900 dark:text-slate-100">
            Phone <span className="text-red-700 dark:text-red-400">*</span>
          </label>
          <input
            {...getFieldProps("phone")}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={20}
            aria-describedby={
              errors.phone ? "phone-help phone-error" : "phone-help"
            }
            onChange={(event) => {
              event.currentTarget.value = normalizePhone(
                event.currentTarget.value,
              );
            }}
          />
          <p id="phone-help" className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            10-digit mobile number
          </p>
          {renderError("phone")}
        </div>
        <div className="grid grid-cols-1 gap-5 sm:col-span-2 sm:grid-cols-[minmax(0,2fr)_minmax(8rem,1fr)]">
          <div>
            <label htmlFor="pickupCity" className="font-semibold text-slate-900 dark:text-slate-100">
              Pickup city <span className="text-red-700 dark:text-red-400">*</span>
            </label>
            <input autoComplete="address-level2" {...getFieldProps("pickupCity")} />
            {renderError("pickupCity")}
          </div>
          <div>
            <label
              htmlFor="pickupPinCode"
              className="font-semibold text-slate-900 dark:text-slate-100"
            >
              Pickup PIN code <span className="text-red-700 dark:text-red-400">*</span>
            </label>
            <input {...getPinCodeProps("pickupPinCode")} />
            <p id="pickupPinCode-help" className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              6-digit PIN code
            </p>
            {renderError("pickupPinCode")}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:col-span-2 sm:grid-cols-[minmax(0,2fr)_minmax(8rem,1fr)]">
          <div>
            <label
              htmlFor="deliveryCity"
              className="font-semibold text-slate-900 dark:text-slate-100"
            >
              Delivery city <span className="text-red-700 dark:text-red-400">*</span>
            </label>
            <input
              autoComplete="off"
              {...getFieldProps("deliveryCity")}
            />
            {renderError("deliveryCity")}
          </div>
          <div>
            <label
              htmlFor="deliveryPinCode"
              className="font-semibold text-slate-900 dark:text-slate-100"
            >
              Delivery PIN code <span className="text-red-700 dark:text-red-400">*</span>
            </label>
            <input {...getPinCodeProps("deliveryPinCode")} />
            <p id="deliveryPinCode-help" className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              6-digit PIN code
            </p>
            {renderError("deliveryPinCode")}
          </div>
        </div>
        <div>
          <label htmlFor="goodsType" className="font-semibold text-slate-900 dark:text-slate-100">
            Goods type <span className="text-red-700 dark:text-red-400">*</span>
          </label>
          <input {...getFieldProps("goodsType")} />
          {renderError("goodsType")}
        </div>
        <div>
          <label
            htmlFor="approximateWeight"
            className="font-semibold text-slate-900 dark:text-slate-100"
          >
            Approximate weight <span className="text-red-700 dark:text-red-400">*</span>
          </label>
          <input
            placeholder="For example, 250 kg"
            {...getFieldProps("approximateWeight")}
          />
          {renderError("approximateWeight")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="pickupDate" className="font-semibold text-slate-900 dark:text-slate-100">
            Preferred pickup date <span className="text-red-700 dark:text-red-400">*</span>
          </label>
          <input type="date" {...getFieldProps("pickupDate")} />
          {renderError("pickupDate")}
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="preferredVehicleSize"
            className="font-semibold text-slate-900 dark:text-slate-100"
          >
            Preferred vehicle size{" "}
            <span className="font-normal text-slate-500 dark:text-slate-400">
              (optional)
            </span>
          </label>
          <select
            id="preferredVehicleSize"
            name="preferredVehicleSize"
            defaultValue=""
            aria-invalid={Boolean(errors.preferredVehicleSize)}
            aria-describedby={
              errors.preferredVehicleSize
                ? "preferredVehicleSize-error"
                : undefined
            }
            className="quote-field mt-2 min-h-12 w-full rounded-xl px-4 outline-none"
          >
            <option value="">Not sure</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={`${vehicle.sizeFeet} feet`}>
                {vehicle.sizeFeet} feet
              </option>
            ))}
          </select>
          {renderError("preferredVehicleSize")}
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="preferredBodyType"
            className="font-semibold text-slate-900 dark:text-slate-100"
          >
            Body type{" "}
            <span className="font-normal text-slate-500 dark:text-slate-400">
              (optional)
            </span>
          </label>
          <select
            id="preferredBodyType"
            name="preferredBodyType"
            defaultValue=""
            aria-invalid={Boolean(errors.preferredBodyType)}
            aria-describedby={
              errors.preferredBodyType ? "preferredBodyType-error" : undefined
            }
            className="quote-field mt-2 min-h-12 w-full rounded-xl px-4 outline-none"
          >
            <option value="">Not sure</option>
            {bodyTypes.map((bodyType) => (
              <option key={bodyType.id} value={bodyType.id}>
                {bodyType.label}
              </option>
            ))}
          </select>
          {renderError("preferredBodyType")}
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="additionalDetails"
            className="font-semibold text-slate-900 dark:text-slate-100"
          >
            Additional details             <span className="font-normal text-slate-500 dark:text-slate-400">(optional)</span>
          </label>
          <textarea
            id="additionalDetails"
            name="additionalDetails"
            rows={4}
            maxLength={fieldLimits.additionalDetails}
            aria-invalid={Boolean(errors.additionalDetails)}
            aria-describedby={
              errors.additionalDetails ? "additionalDetails-error" : undefined
            }
            className="quote-field mt-2 w-full rounded-xl px-4 py-3 outline-none"
          />
          {renderError("additionalDetails")}
        </div>
      </div>

      <div className="flex flex-col items-start gap-4">
        <Button id="quote-submit" type="submit" disabled={isCoolingDown}>
          {isCoolingDown ? "Please wait..." : "Prepare WhatsApp enquiry"}
        </Button>
        {feedback && (
          <p
            role="status"
            aria-live="polite"
            className="motion-message max-w-2xl text-sm leading-6 text-slate-700 dark:text-slate-300"
          >
            {feedback}
          </p>
        )}
      </div>
    </form>
  );
}
