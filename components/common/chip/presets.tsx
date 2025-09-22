"use client";

import * as React from "react";
import Image from "next/image";
import { Chip } from "./Chips";
import type { ChipProps } from "./Chips";

/* ----------------------------------------------------------------
 * Region / Address / Service Chips + Groups (Presets)
 * ----------------------------------------------------------------
 * 아이콘 파일 경로:
 *  - public/icons/ic_box.svg
 *  - public/icons/ic_document.svg
 * ---------------------------------------------------------------- */

/* ---------------------------- 지역 칩 ---------------------------- */
/** 지역 다중 선택용 (기본: 회색 아웃라인, 선택: 주황 하이라이트) */
export interface RegionChipProps
  extends Omit<ChipProps, "variant" | "color" | "selected"> {
  selected?: boolean;
}
export function RegionChip({ selected, children, ...rest }: RegionChipProps) {
  return (
    <Chip variant="outline" color="neutral" selected={selected} {...rest}>
      {children}
    </Chip>
  );
}

/* -------------------------- 주소 탭 칩 --------------------------- */
/** 도로명/지번 토글용 (항상 solid/primary 스타일) */
export interface AddressChipProps
  extends Omit<ChipProps, "variant" | "color" | "selected"> {
  active?: boolean;
}
export function AddressChip({
  active = false,
  children,
  ...rest
}: AddressChipProps) {
  return (
    <Chip variant="solid" color="primary" aria-pressed={active} {...rest}>
      {children}
    </Chip>
  );
}

/* -------------------------- 이사유형 칩 -------------------------- */
/** 아이콘이 들어가는 칩 (solid/primary) */
export interface ServiceChipProps extends Omit<ChipProps, "variant" | "color"> {
  iconSrc?: string; // /public/icons/* 경로
  iconSize?: number; // 아이콘 픽셀
}
export function ServiceChip({
  iconSrc,
  iconSize = 18,
  children,
  ...rest
}: ServiceChipProps) {
  return (
    <Chip
      variant="solid"
      color="primary"
      leftIcon={
        iconSrc ? (
          <Image
            src={iconSrc}
            alt=""
            width={iconSize}
            height={iconSize}
            aria-hidden
          />
        ) : undefined
      }
      {...rest}
    >
      {children}
    </Chip>
  );
}

/* ---------------------- 이사유형 아이콘 프리셋 -------------------- */
/** 소형이사 */
export function SmallMoveChip(props: Omit<ServiceChipProps, "iconSrc">) {
  return (
    <ServiceChip iconSrc="/icons/ic_box.svg" {...props}>
      소형이사
    </ServiceChip>
  );
}

/** 지정 견적 요청 */
export function DesignatedQuoteChip(props: Omit<ServiceChipProps, "iconSrc">) {
  return (
    <ServiceChip iconSrc="/icons/ic_document.svg" {...props}>
      지정 견적 요청
    </ServiceChip>
  );
}

/* ------------------------ 컨트롤드 그룹 ------------------------- */
/** 단일선택 토글 그룹 (주소 탭 등) */
export function SingleSelectChipGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (next: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <AddressChip
          key={opt.value}
          active={opt.value === value}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </AddressChip>
      ))}
    </div>
  );
}

/** 다중선택 그룹 (지역 칩 등) */
export function MultiSelectRegionGroup<T extends string>({
  options,
  values,
  onChange,
}: {
  options: { label: string; value: T }[];
  values: T[];
  onChange: (next: T[]) => void;
}) {
  const toggle = (v: T) =>
    values.includes(v) ? values.filter((x) => x !== v) : [...values, v];

  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => {
        const isSelected = values.includes(opt.value);
        return (
          <RegionChip
            key={opt.value}
            selected={isSelected}
            onClick={() => onChange(toggle(opt.value))}
          >
            {opt.label}
          </RegionChip>
        );
      })}
    </div>
  );
}
