"use client";
import { useCreateRegister } from "@/modules/registers/hooks/use-register";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckedState } from "@radix-ui/react-checkbox";
import { motion } from "motion/react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useQueryState, parseAsStringLiteral } from "nuqs";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function FormSection() {
  const t = useTranslations("JoinPage.form");

  const formSchema = z.object({
    name: z.string().min(1, t("fields.name.error")),
    email: z.email(t("fields.email.error")),
    phone: z.string().min(1, t("fields.phone.error")),
    address: z.string().min(1, t("fields.address.error")),
    city: z.string().min(1, t("fields.city.error")),
    state: z.string().min(1, t("fields.state.error")),
    zipCode: z.string().min(1, t("fields.zipCode.error")),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const [origin] = useQueryState(
    "origin",
    parseAsStringLiteral([
      "association",
      "support",
      "legal",
      "event",
      "newsletter",
      "others",
    ]).withDefault("association"),
  );

  const [event] = useQueryState("event");

  const createRegister = useCreateRegister();
  const [confirmTerms, setConfirmTerms] = useState<CheckedState>(false);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormSchema) => {
    createRegister.mutate(
      { ...data, origin, event: event || undefined },
      {
        onSuccess: () => {
          form.reset();
        },
      },
    );
  };

  function phoneMask(value: string) {
    value = value.replace(/\D/g, "");

    if (value.length > 11) value = value.slice(0, 11);

    if (value.length >= 11) {
      return value
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{5})(\d{4})$/, "$1-$2");
    }

    return value
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{4})(\d{4})$/, "$1-$2");
  }

  const isFormDisabled = createRegister.isPending || !confirmTerms;

  return (
    <section id="form" className="py-14">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("title")}
            </h2>
            <p className="text-gray-600">{t("description")}</p>
          </div>

          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <Field>
              <Label htmlFor="full_name">{t("fields.name.label")}</Label>
              <Input
                id="full_name"
                className="mt-1.5"
                placeholder={t("fields.name.placeholder")}
                {...form.register("name")}
                disabled={createRegister.isPending}
              />
              <FieldError>{form.formState.errors.name?.message}</FieldError>
            </Field>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email">{t("fields.email.label")}</Label>
                <Input
                  id="email"
                  type="email"
                  className="mt-1.5"
                  placeholder={t("fields.email.placeholder")}
                  disabled={createRegister.isPending}
                  {...form.register("email")}
                />
                <FieldError>{form.formState.errors.email?.message}</FieldError>
              </div>
              <div>
                <Label htmlFor="phone">{t("fields.phone.label")}</Label>
                <Input
                  id="phone"
                  className="mt-1.5"
                  placeholder={t("fields.phone.placeholder")}
                  disabled={createRegister.isPending}
                  {...form.register("phone")}
                  onChange={(e) =>
                    form.setValue("phone", phoneMask(e.target.value))
                  }
                />
                <FieldError>{form.formState.errors.phone?.message}</FieldError>
              </div>
            </div>

            <div>
              <Label htmlFor="address">{t("fields.address.label")}</Label>
              <Input
                id="address"
                className="mt-1.5"
                placeholder={t("fields.address.placeholder")}
                {...form.register("address")}
                disabled={createRegister.isPending}
              />
              <FieldError>{form.formState.errors.address?.message}</FieldError>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="city">{t("fields.city.label")}</Label>
                <Input
                  id="city"
                  className="mt-1.5"
                  placeholder={t("fields.city.placeholder")}
                  {...form.register("city")}
                  disabled={createRegister.isPending}
                />
                <FieldError>{form.formState.errors.city?.message}</FieldError>
              </div>
              <div>
                <Label htmlFor="state">{t("fields.state.label")}</Label>
                <Input
                  id="state"
                  className="mt-1.5"
                  placeholder={t("fields.state.placeholder")}
                  {...form.register("state")}
                  disabled={createRegister.isPending}
                />
                <FieldError>{form.formState.errors.state?.message}</FieldError>
              </div>
              <div>
                <Label htmlFor="zip_code">{t("fields.zipCode.label")}</Label>
                <Input
                  id="zip_code"
                  className="mt-1.5"
                  placeholder={t("fields.zipCode.placeholder")}
                  {...form.register("zipCode")}
                  disabled={createRegister.isPending}
                />
                <FieldError>
                  {form.formState.errors.zipCode?.message}
                </FieldError>
              </div>
            </div>

            <Field orientation="horizontal">
              <Checkbox
                id="terms"
                checked={confirmTerms}
                onCheckedChange={(e) => setConfirmTerms(e)}
                disabled={createRegister.isPending}
              />
              <FieldLabel htmlFor="terms" className="gap-0">
                {t("terms.text")}
                <Link
                  href="/policies#terms"
                  target="_blank"
                  className="font-bold hover:underline mx-1"
                >
                  {t("terms.link")}
                </Link>
                {t("terms.and")}
                <Link
                  href="/policies"
                  target="_blank"
                  className="font-bold hover:underline mx-1"
                >
                  {t("terms.privacy")}
                </Link>
              </FieldLabel>
            </Field>

            <Button type="submit" className="w-full" disabled={isFormDisabled}>
              {t("submit")}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
