"use client"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toaster from "react-hot-toast";


import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
    FormItem,
  } from "@/components/ui/form";


import { useEffect, useState } from "react";

import {PlusIcon} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/modal";
import { Loader } from "@/components/loader";
import { createProduct } from "@/actions/create-product";


const FormSchema = z.object({
    name:z.string().min(1,{
        message:"required"
    }),
    description:z.string().min(1,{
        message:"required"
    }),
    price:z.number().min(1,{
        message:"required"
    }),
    url:z.string().min(1,{
        message:"required"
    })
  });

export const CreateProductModal = () =>{   
    const [showModal, setShowModal] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    


    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            url: ""
        },
        mode: "onChange"
      });

        const { formState } = form;

      const { isSubmitting, isValid } = formState;


      const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {
            await createProduct(values);
            toaster.success("Product created");
            form.reset();
            router.refresh();
            setShowModal(false);
        } catch {
          toaster.error("Something went wrong");
        }
      }

      useEffect (()=>{
        setIsMounted(true);
        }, []);

        if (!isMounted) {
            return null;
        }

        const onClick = () => {
            setShowModal(true);
        }

        return (
            <>
                <Button onClick={onClick} className="bg-sky-700 text-[12px] hover:bg-sky-900">
                 <PlusIcon className="h-4 w-4" />Add Product
                </Button>

            <Modal
                title="Create New Product"
                isOpen = {showModal}
                
                handleClose = {()=>setShowModal(false)}
            >
                <div>
                <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                   Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                   Description
                  </FormLabel>
                  <FormControl>
                    <Textarea   
                      disabled={isSubmitting}
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                   Price
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isSubmitting}
                      placeholder=""
                      {...field}
                      onBlur={() => {
                        // Ensure the value is a number after the blur event
                        const value = field.value;
                        if (value && !isNaN(value)) {
                            field.onChange(Number(value));
                        }
                    }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                   Image URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      disabled={isSubmitting}
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex items-center justify-between gap-x-2">
             
                <Button
                onClick={()=>setShowModal(false)}
                  type="button"
                  variant="secondary"
                >
                  Cancel
                </Button>
             
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                
                {isSubmitting && (
                    <Loader /> 
                )}

                 Save
              </Button>
            </div>
          </form>
                </Form>
                </div>
                

            </Modal>
            </>
        );
}