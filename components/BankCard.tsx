import { formatAmount } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BankCard = ({ account, userName, showBalance }: CreditCardProps) => {
  return (
    <div className="flex flex-col">
      <Link href={"/"} className="bank-card">
        <div className="bank-card_content">
          <div>
            <h1 className="text-16 font-semibold text-white">
              {account.name || userName}
            </h1>
            <p className="font-ibm-plex-serif font-black text-white">
              {formatAmount(account.currentBalance)}
            </p>
          </div>
          <article className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-12 text-white font-semibold">{userName}</h1>
              <h2 className="text-12 text-white font-semibold">●●/●●</h2>
            </div>
            <p className="tracking-[1.1px] text-14 text-white font-semibold">
              ●●●● ●●●● ●●●●{" "}
              <span className="text-16"> {account.mask || 1234}</span>
            </p>
          </article>
        </div>
        <div className="bank-card_icon">
          <Image src="/icons/Paypass.svg" width={20} height={24} alt="pay" />
          <Image
            src="/icons/mastercard.svg"
            width={45}
            height={34}
            alt="master"
            className="ml-5"
          />
          <Image
            src={"/icons/lines.png"}
            width={319}
            height={145}
            alt="lines"
            className="absolute right-0 left-0"
          />
        </div>
      </Link>

      {/* COPY */}
    </div>
  );
};

export default BankCard;
