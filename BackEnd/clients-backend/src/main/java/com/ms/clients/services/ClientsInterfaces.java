package com.ms.clients.services;

import java.util.List;

import com.ms.clients.entities.Clients;


public interface ClientsInterfaces {

	List<Clients> findAll();
	Clients findById(String sharedKey);
	void save(Clients clients);
	void delete(String sharedKey);
	Clients update(Clients sharedKey);
	Clients findBySharedId(String sharedKey);
}
