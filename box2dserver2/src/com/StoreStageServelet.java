package com;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class StoreStageServelet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private static final String FOLDER = StoreLevel.FOLDER_CORE+"simulated\\";

	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		System.out.println("In post function");
		StringBuffer jb = new StringBuffer();
		String line = null;
		try {
			BufferedReader reader = req.getReader();
			while ((line = reader.readLine()) != null)
				jb.append(line);
		} catch (Exception e) {
		}

		File folder = new File(FOLDER);
		File[] files = folder.listFiles();
		File newFileName = new File(FOLDER + (Math.random() * 1000000000)+".json");

		FileWriter fw = new FileWriter(newFileName);
		fw.write(jb.toString());
		fw.flush();
		fw.close();

		String clientOrigin = req.getHeader("origin");

		String ipAddress = req.getHeader("x-forwarded-for");
		resp.setHeader("Access-Control-Allow-Origin", clientOrigin);
		resp.setHeader("Access-Control-Allow-Methods", "GET");
		resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
		resp.setHeader("Access-Control-Max-Age", "86400");

		resp.getWriter().print("success");
	}

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub

		resp.getWriter().print("success");
	}

}
