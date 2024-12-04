import FieldWithList from "@/components/pages/home/field-with-list";

export default function Home() {
  return (
    <>
      {/* TODO: remove pt-safe, if it's not needed */}
      <main className="pt-safe px-safe flex justify-between gap-10 mx-12 mt-12">
        <FieldWithList />
      </main>
      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer> */}
    </>
  );
}
