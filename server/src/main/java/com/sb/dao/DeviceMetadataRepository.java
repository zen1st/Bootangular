package com.sb.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sb.pojo.DeviceMetadata;

import java.util.List;

public interface DeviceMetadataRepository extends JpaRepository<DeviceMetadata, Long> {

    List<DeviceMetadata> findByUserId(Long userId);
}
