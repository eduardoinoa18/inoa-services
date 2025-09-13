"use client";
import Image from "next/image";
import { useState } from "react";
import type { TeamMember } from "@/lib/team-data";

export default function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {members.map((m) => (
        <TeamCard key={m.name} member={m} />
      ))}
    </div>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  const [src, setSrc] = useState(member.image || "/images/founder-placeholder.svg");
  return (
    <div className="rounded-2xl border bg-white p-5 flex flex-col items-center text-center shadow-sm">
      <div className="relative w-28 h-28 mb-4">
        <Image
          src={src}
          alt={member.name}
          fill
          sizes="112px"
          className="rounded-full object-cover border"
          onError={() => setSrc("/images/founder-placeholder.svg")}
        />
      </div>
      <h3 className="font-semibold text-gray-900">{member.name}</h3>
      {member.title && <p className="text-sm text-gray-500 mt-0.5">{member.title}</p>}
      {member.bio && <p className="text-sm text-gray-600 mt-3">{member.bio}</p>}
      {member.socials && member.socials.length > 0 && (
        <div className="mt-3 flex flex-wrap justify-center gap-3 text-sm">
          {member.socials.map((s) => (
            <a key={s.href} href={s.href} target="_blank" className="text-blue-600 hover:underline">{s.label}</a>
          ))}
        </div>
      )}
    </div>
  );
}
