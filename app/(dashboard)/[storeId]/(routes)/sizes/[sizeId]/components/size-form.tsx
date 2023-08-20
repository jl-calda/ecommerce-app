"use client";

import * as z from "zod";
import { useParams, useRouter } from "next/navigation";
import Icons from "@/components/Icons";
import { Size } from "@prisma/client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AlertModal from "@/components/alert-modal";

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

type SizeFormValues = z.infer<typeof formSchema>;

interface SizeFormProps {
  initialData: Size | null;
}

const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Size" : "Create Sizes";
  const description = initialData ? "Edit your Size" : "Add a new Size";
  const toastMessage = initialData ? "Size updated" : "Size added";
  const action = initialData ? "Update" : "Add";

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: SizeFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios
          .patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data)
          .then(() => router.refresh())
          .then(() => router.push(`/${params.storeId}/sizes`))
          .then(() => toast.success(toastMessage));
      } else {
        await axios
          .post(`/api/${params.storeId}/sizes`, data)
          .then(() => router.refresh())
          .then(() => router.push(`/${params.storeId}/sizes`))
          .then(() => toast.success(toastMessage));
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      axios
        .delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
        .then(() => router.refresh())
        .then(() => router.push(`/${params.storeId}/sizes`))
        .then(() => toast.success("Size deleted"));
    } catch (error) {
      toast.error("Make sure you don't products on this size");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading
          title={title}
          description={description}
        />
        {initialData && (
          <Button
            disabled={loading}
            size="icon"
            onClick={() => {
              setOpen(true);
            }}
            variant="destructive"
          >
            <Icons.Trash />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Size name"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Size value"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="ml-auto"
            disabled={loading}
          >
            {action}
          </Button>
        </form>
      </Form>
      {/* <Separator /> */}
    </>
  );
};

export default SizeForm;
