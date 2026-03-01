import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Volodymyr Vreshch - Contacts',
};

export default function ContactsPage() {
  return (
    <div>
      <h1 className="text-3xl">Contacts</h1>
      <hr className="my-4 border-t border-black/10" />
      <div className="text-justify">
        <div className="float-left mr-5">
          <Image
            className="rounded border border-gray-300"
            alt="Volodymyr Vreshch"
            width={200}
            height={200}
            src="/images/mphoto.jpeg"
          />
        </div>
        <p>
          Homepage:{' '}
          <a href="http://vreshch.com/" target="_blank" rel="noreferrer">
            vreshch.com
          </a>
        </p>
        <p>Email: vreshch@gmail.com</p>
        <p>Skype: vreshch.work</p>
        <p>Tel: +38(096)337-87-**</p>
        <p>
          Linkedin:{' '}
          <a
            href="https://www.linkedin.com/in/vreshch-volodymyr-3969498a"
            target="_blank"
            rel="noreferrer"
          >
            Volodymyr Vreshch
          </a>
        </p>
        <p>
          Github:{' '}
          <a href="https://github.com/vreshch" target="_blank" rel="noreferrer">
            vreshch
          </a>
        </p>
      </div>
    </div>
  );
}
