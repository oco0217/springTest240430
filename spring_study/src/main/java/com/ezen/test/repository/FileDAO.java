package com.ezen.test.repository;

import java.util.List;

import com.ezen.test.domain.FileVO;

public interface FileDAO {

	int insertFile(FileVO fvo);

	List<FileVO> getFileList(int bno);

	int fileRemove(String uuid);

}